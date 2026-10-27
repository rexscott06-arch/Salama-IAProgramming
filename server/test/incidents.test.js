const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const express = require('express');

let insertedAnonymous;
let queryCount = 0;
let queryError;

const fakeDb = {
  async query(sql, params = []) {
    queryCount += 1;
    if (queryError) {
      throw queryError;
    }

    if (sql.startsWith('INSERT INTO incidents')) {
      insertedAnonymous = params[6];
      return [{ insertId: 1 }];
    }

    if (sql.startsWith('SELECT * FROM incidents WHERE id = ?')) {
      return [[{
        id: 1,
        case_ref: 'SAL-12345',
        incident_type: 'physical',
        incident_date: '2026-10-01',
        county: 'nairobi',
        description: 'Test incident',
        status: 'open',
        is_anonymous: insertedAnonymous
      }]];
    }

    throw new Error(`Unexpected query: ${sql}`);
  }
};

const dbPath = require.resolve('../db');
require.cache[dbPath] = {
  id: dbPath,
  filename: dbPath,
  loaded: true,
  exports: fakeDb
};

const incidents = require('../routes/incidents');
delete require.cache[dbPath];

const app = express();
app.use(express.json());
app.use('/api/incidents', incidents);

const server = app.listen(0);
const baseUrl = new Promise((resolve) => {
  server.once('listening', () => {
    resolve(`http://127.0.0.1:${server.address().port}/api/incidents`);
  });
});

before(async () => {
  await baseUrl;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

test('create incident preserves an explicit anonymous=false value', async () => {
  const response = await fetch(await baseUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      case_ref: 'SAL-12345',
      incident_type: 'physical',
      incident_date: '2026-10-01',
      county: 'nairobi',
      description: 'Test incident',
      is_anonymous: false
    })
  });

  assert.equal(response.status, 201);
  assert.equal(insertedAnonymous, false);
  assert.equal((await response.json()).is_anonymous, false);
});

test('create incident defaults anonymous to true when omitted', async () => {
  const response = await fetch(await baseUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      case_ref: 'SAL-12345',
      incident_type: 'physical',
      incident_date: '2026-10-01',
      county: 'nairobi',
      description: 'Test incident'
    })
  });

  assert.equal(response.status, 201);
  assert.equal(insertedAnonymous, true);
  assert.equal((await response.json()).is_anonymous, true);
});

test('create incident rejects impossible calendar dates', async () => {
  const previousQueryCount = queryCount;
  const response = await fetch(await baseUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      case_ref: 'SAL-12345',
      incident_type: 'physical',
      incident_date: '2026-02-31',
      county: 'nairobi',
      description: 'Test incident'
    })
  });

  assert.equal(response.status, 400);
  assert.equal(queryCount, previousQueryCount);
});

test('create incident reports database login failures without leaking internals', async () => {
  queryError = {
    code: 'ER_ACCESS_DENIED_ERROR',
    message: 'Access denied for user secret-user'
  };

  const response = await fetch(await baseUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      case_ref: 'SAL-12345',
      incident_type: 'physical',
      incident_date: '2026-10-01',
      county: 'nairobi',
      description: 'Test incident'
    })
  });
  const body = await response.json();
  queryError = undefined;

  assert.equal(response.status, 503);
  assert.equal(body.error, 'Database authentication failed. Check DB_USER and DB_PASSWORD in server/.env.');
  assert.equal(JSON.stringify(body).includes('secret-user'), false);
});
