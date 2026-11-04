# Monitoring Notes - Salama API

## 1. Predictions vs. what the data shows

Note: these predictions were written after the first /stats run, so they are reasoned from how the API is built, not blind guesses. I am saying so rather than pretending otherwise.

**Prediction 1: slowest endpoint.** I expected GET /api/donations/summary to be the slowest, because it runs aggregate calculations (total, count, average) over the whole donations table, while the other routes only read rows.

**Data:** The slowest on average was GET /api/volunteers/ (40.7 ms average, 157.7 ms worst case, 4 calls). GET /api/donations/summary came second (13.6 ms average, 74.8 ms worst case, 6 calls). My prediction was partly right: the summary route is slow compared with simple reads, but volunteers was slower.

**Prediction 2: most errors.** I expected GET /api/incidents/:id to have the most errors, because callers ask for ids that do not exist and get a 404.

**Data:** 7 of its 14 calls were 404s, which is half. But the largest error group overall was "GET (no route)", with 13 errors: 8 rejected 401s and 5 requests to a path that does not exist. There were 0 server errors (5xx), so the error rate was 0%. All 20 errors were caller mistakes, not faults in Salama.

## 2. A pattern in my traffic

GET /api/volunteers/ averaged 40.7 ms, about 20 times slower than GET /api/incidents/:id at 1.8 ms, and its slowest call was 157.7 ms. GET /api/incidents/ had a similar spike: 7.7 ms average but a 115.2 ms worst case.

## 3. Why I think it happens, and what I would check next

Both spikes may come from the first database query after a restart, since the first incidents call was 115 ms. Volunteers had only 4 calls, so one slow call dominates its average. I do not know yet. Next I would run 200 requests (N=200) and see whether the volunteers average falls toward the others. If it stays high, I would look at the volunteers query itself.

## 4. One alert I would want in production

Alert when errorRatePercent (5xx errors only) stays above 5% for 5 minutes. While a person investigates, the Community Events feature should already be serving saved data with the "saved data" banner, as built in Week 11, so users are not stuck.

## 5. Limits

- The numbers are in memory and reset when the server restarts.
- The "(no route)" row mixes 401s and 404s, so the log lines are needed to tell them apart.
- These numbers only include my own test traffic. My partner's traffic is not in them yet.
