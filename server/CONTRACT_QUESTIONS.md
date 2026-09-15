# CONTRACT_QUESTIONS.md — Review of Upstream Partner (Group 12) API

## 3 Specific Questions / Ambiguities

**Question 1 — `/market-prices?productType={type}`**
What is the exact type and format of the `price` field in the response?
Is it a number (e.g. 45.50) or a string (e.g. "KES 45.50")?
What currency is assumed — KES? Is there a currency field or is it hardcoded?

**Question 2 — `/sellers/{id}`**
The endpoint uses `{id}` but Need 2 references `User name` — 
is the seller looked up by numeric ID or by username string?
These are different things and will change how we build our query.
Also what is the data type and range of `rating` — is it 0–5, 0–10, or a percentage?

**Question 3 — `/listings?status=active&productType={type}&minGoods={number}`**
What does the response look like when no listings match the filters —
is it an empty array `[]` or a 404? 
Also what unit is `minGoods` measured in — kilograms, bags, crates?
Without knowing the unit, we cannot display it meaningfully to a buyer.