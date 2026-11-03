# Resilience Notes - Salama x Faraja

Feature protected: GET /api/partner/memorials, which fetches memorial events from Faraja and shows them on the Community Events page.

## 1. What I tested

| Failure | Before the fix | After the fix | What the log said |
|---|---|---|---|
| Normal | 200 in about 0.03 s | 200 in about 0.03 s | (no failure) |
| Slow partner (10 s) | 200 after 10.07 s, page hung | 502 in 5.13 s when nothing was saved; 200 in 5.12 s with stale:true when a saved copy existed | attempt 1 and 2 failed, retrying; then partner call failed: timeout |
| Flaky partner (fails twice, then works) | 502, 502, 200 (gave up on the first failure) | TODO: fill in after running the flaky test again | attempt 1 failed, retrying in 200 ms; attempt 2 failed, retrying in 400 ms |
| Real partner (Faraja) stopped | n/a | Events page showed the saved events plus a banner "Showing saved data from 4:08:29 PM. Faraja is not responding." | partner call failed with a connection error |
| Real partner restarted | n/a | Banner disappeared, live data returned, no code changed | (no failure) |

## 2. My numbers, and why

- Timeout: 1500 ms. A normal call took about 30 ms, so 1500 ms leaves a lot of room for a bad moment and is still shorter than a user's patience.
- Retries: 2 (GET only). Enough to survive a brief hiccup, few enough not to flood a struggling partner.
- Delay: 200 ms, then 400 ms (doubling each attempt).
- Worst-case wait: 3 x 1500 + 200 + 400 = 5100 ms. I measured 5.13 s in the slow test, which matches. About five seconds is acceptable for an events list that is not urgent.
- The POST to /awareness-activities has a single 3 s timeout and no retries, because a retried POST could create the same record twice.

## 3. What a real user would experience without this code

A volunteer opens the Community Events page to find an upcoming memorial. If Faraja is slow, the page sits on "Loading events..." for as long as Faraja takes, which was 10 seconds in my test, and most people would close the tab before then. If Faraja has a brief hiccup, the page shows "Partner data unavailable" even though a second attempt a moment later would have worked. The volunteer cannot tell a short blip from a real outage, so they give up on the page. With this code, short failures are retried automatically, and a longer outage shows the last saved events with a banner saying how old they are. The volunteer can still see the dates and places and plan to attend.

## 4. What I did not build

A circuit breaker is a switch that stops calling a partner that has been failing for a while, and tests it occasionally. Mine still tries every request three times, so during a long outage every page load waits about 5 seconds. A circuit breaker would fail fast after the first few failures, serve the saved copy straight away, and check Faraja again every so often.

## 5. Limits

- The saved copy lives in memory, so it disappears when Salama restarts.
- The Events page shows "Partner data unavailable" if Faraja is down and nothing has been saved yet.
