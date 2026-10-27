# Salama API

## Overview
Salama is a Gender-Based Violence (GBV) awareness and support API built for Kenya. It enables anonymous incident reporting, resource discovery (shelters, hotlines, legal aid, medical), volunteer registration, and donation processing. It is intended for use by survivors, NGO staff, and developers building GBV-support applications.

---

## How to Run Locally

Requirements: Node.js, MySQL running locally

    git clone <your-repo-url>
    cd server
    npm install

Create a `.env` file in the `server/` directory. `DB_HOST`, `DB_USER`, and
`DB_NAME` are required. Set `DB_USER` and `DB_PASSWORD` to a MySQL account
that can access `salama_db`; `DB_PASSWORD` may be empty if that account has no
password:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=salama_db
    DB_PORT=3306
    PORT=5000

With the MySQL client installed, create the database and all API tables from
the `server/` directory:

    mysql -u root -p < setup-local-mysql.sql

The account used to run this command needs permission to create databases and
tables. The application account configured in `.env` needs `SELECT`, `INSERT`,
and `UPDATE` access to those tables. If an endpoint returns a database error,
check the server terminal for the underlying MySQL error.
If the API reports a database authentication failure, set `DB_USER` and
`DB_PASSWORD` to credentials that MySQL accepts, then restart the server.

Start the server:

    node index.js

API will be available at: http://localhost:5000
Interactive docs: http://localhost:5000/api-docs

## Connect the Front End

From the repository root, start the API and the Vite client in separate terminals:

    npm --prefix server start
    npm --prefix Client run dev

Open the client URL printed by Vite (normally http://localhost:5173). Client API
requests use `/api` and are proxied to `http://127.0.0.1:5000` during development.
Set `VITE_API_PROXY_TARGET` in the client environment to use another API host.
For a deployed client, set `VITE_API_URL` to the API base URL. Database
credentials belong only in `server/.env`; never put them in the client.

To view community events in Salama while the client is running, open
http://localhost:5173/community-events.

The client requires a running API and MySQL database. Follow the setup above to
configure `server/.env` and create the database tables before using database
features. Online donations remain unavailable until a payment provider is
integrated; the client does not collect or store payment details.

## Faraja community events feature

The client route `/community-events` integrates with Faraja. It uses the live
Faraja API by default. To explicitly switch to sample events and local,
temporary demo submissions, set `VITE_FARAJA_API_MODE=demo` before starting
Vite. The page will clearly label demo submissions as not sent or saved.

The feature expects Faraja's `GET /memorial-events` to return an array with
`id`, `eventName`, `date`, and `location`. It submits an activity to
`POST /awareness-activities` with the contract fields `memorialEventId` and
`activityName`, plus optional `description` and `date`.

To try the live integration:
3. In a second terminal, set the Faraja proxy target and start this client.
   Live mode is the default:

       $env:VITE_FARAJA_API_PROXY_TARGET = "http://127.0.0.1:5001"
       npm --prefix Client run dev

4. Open `http://localhost:5173/community-events`. Confirm the event list loads,
   select an event, fill in an activity name, and submit. Check the Faraja API
   response or database to verify it was created.

Vite removes the `/faraja-api` prefix before forwarding requests to the
contract's root paths. If Faraja is unavailable, the page displays the API
error; it does not silently substitute sample data. For production, set
`VITE_FARAJA_API_URL` to Faraja's base URL and configure Faraja CORS or a
server-side proxy. Never put database credentials in the client.

---

## Authentication

Authentication is not yet enforced (arriving in Week 9). All endpoints are currently open. When auth is added, requests will require a Bearer token:

    Authorization: Bearer <token>

---

## Endpoints and Examples

### Incidents

GET /api/incidents — List all reported incidents

    curl http://localhost:5000/api/incidents

Response 200:

    [
      {
        "id": 1,
        "case_ref": "SAL-00001",
        "incident_type": "physical",
        "incident_date": "2026-01-15",
        "county": "nairobi",
        "description": "Incident description here",
        "status": "open",
        "is_anonymous": true
      }
    ]

POST /api/incidents — Report a new incident

    curl -X POST http://localhost:5000/api/incidents \
      -H "Content-Type: application/json" \
      -d '{"case_ref":"SAL-12345","incident_type":"physical","incident_date":"2026-10-01","county":"nairobi","description":"Description of the incident","is_anonymous":true}'

Response 201:

    {
      "id": 10,
      "case_ref": "SAL-12345",
      "incident_type": "physical",
      "incident_date": "2026-10-01",
      "county": "nairobi",
      "description": "Description of the incident",
      "status": "open",
      "is_anonymous": true
    }

PATCH /api/incidents/:id/status — Update incident status

    curl -X PATCH http://localhost:5000/api/incidents/1/status \
      -H "Content-Type: application/json" \
      -d '{"status":"in_review"}'

Response 200:

    {
      "message": "Incident status updated"
    }

---

### Resources

GET /api/resources — List all support resources

    curl http://localhost:5000/api/resources

Response 200:

    [
      {
        "id": 1,
        "name": "Nairobi Women's Hospital",
        "type": "medical",
        "county": "nairobi",
        "description": "Medical support for GBV survivors",
        "contact": "0800723253",
        "available": "24/7"
      }
    ]

POST /api/resources — Add a new resource

    curl -X POST http://localhost:5000/api/resources \
      -H "Content-Type: application/json" \
      -d '{"name":"Kisumu Shelter","type":"shelter","county":"kisumu","description":"Emergency shelter for GBV survivors","contact":"0712345678","available":"24/7"}'

Response 201:

    {
      "id": 7,
      "name": "Kisumu Shelter",
      "type": "shelter",
      "county": "kisumu",
      "description": "Emergency shelter for GBV survivors",
      "contact": "0712345678",
      "available": "24/7"
    }

---

### Donations

GET /api/donations — List all donations

    curl http://localhost:5000/api/donations

GET /api/donations/summary — Get donation totals

    curl http://localhost:5000/api/donations/summary

Response 200:

    [
      {
        "payment_method": "mpesa",
        "total_donations": 5,
        "total_amount": 15000.00,
        "average_amount": 3000.00
      }
    ]

POST /api/donations — Record a donation

    curl -X POST http://localhost:5000/api/donations \
      -H "Content-Type: application/json" \
      -d '{"donor_name":"Jane Doe","amount":1000,"payment_method":"mpesa","transaction_ref":"MPE123456","is_anonymous":false}'

Response 201:

    {
      "id": 10,
      "donor_name": "Jane Doe",
      "amount": 1000.00,
      "payment_method": "mpesa",
      "transaction_ref": "MPE123456",
      "is_anonymous": false
    }

---

### Volunteers

GET /api/volunteers — List all volunteer applications

    curl http://localhost:5000/api/volunteers

POST /api/volunteers — Submit a volunteer application

    curl -X POST http://localhost:5000/api/volunteers \
      -H "Content-Type: application/json" \
      -d '{"name":"Alice Wanjiru","email":"alice@example.com","phone":"0722000000","county":"nairobi","role":"counsellor","availability":"weekends","experience":"3 years NGO work","motivation":"I want to support survivors in my community"}'

Response 201:

    {
      "id": 10,
      "name": "Alice Wanjiru",
      "email": "alice@example.com",
      "phone": "0722000000",
      "county": "nairobi",
      "role": "counsellor",
      "availability": "weekends",
      "status": "pending"
    }

PATCH /api/volunteers/:id/status — Update volunteer status

    curl -X PATCH http://localhost:5000/api/volunteers/1/status \
      -H "Content-Type: application/json" \
      -d '{"status":"approved"}'

Response 200:

    {
      "id": 1,
      "name": "Alice Wanjiru",
      "email": "alice@example.com",
      "phone": "0722000000",
      "county": "nairobi",
      "role": "counsellor",
      "availability": "weekends",
      "experience": "3 years NGO work",
      "motivation": "I want to support survivors in my community",
      "status": "approved"
    }

---

### Users

GET /api/users — List all users

    curl http://localhost:5000/api/users

GET /api/users/:id — Get a user by ID

    curl http://localhost:5000/api/users/1

Response 200:

    {
      "id": 1,
      "name": "Admin User",
      "email": "admin@salama.org",
      "role": "admin"
    }

---

## Error Format

All errors return JSON in this shape:

    { "error": "Description of what went wrong" }

Common errors:

    400 - Missing or invalid field
        { "error": "incident_type must be one of: physical, sexual, emotional, economic, other" }

    404 - Resource not found
        { "error": "Incident not found" }

    500 - Server error
        { "error": "Internal server error" }

---

## Interactive Docs

Full API documentation with live request testing available at:

    http://localhost:5000/api-docs
