# CONTRACT_DEVIATIONS.md

## Week 5 — GET Endpoint Verification Report

### Deviations Found and Fixed

#### 1. incidents — is_anonymous field
- **Original contract:** boolean (true/false)
- **What database returned:** integer (1 or 0)
- **Fix:** Added mapping in routes/incidents.js to convert 1/0 to true/false
- **Contract change:** No — implementation was fixed, contract was correct

#### 2. incidents — incident_date field
- **Original contract:** string (date format: YYYY-MM-DD)
- **What database returned:** full datetime string (2024-01-14T21:00:00.000Z)
- **Fix:** Added .split('T')[0] to extract date only in mapIncident helper
- **Contract change:** No — implementation was fixed, contract was correct

#### 3. donations — amount field
- **Original contract:** number (double)
- **What database returned:** string ("1000.00")
- **Fix:** Added parseFloat() in mapDonation helper
- **Contract change:** No — implementation was fixed, contract was correct

#### 4. donations — is_anonymous field
- **Original contract:** boolean (true/false)
- **What database returned:** integer (1 or 0)
- **Fix:** Added mapping in mapDonation helper to convert 1/0 to true/false
- **Contract change:** No — implementation was fixed, contract was correct

#### 5. donations/summary — extra field
- **Original contract:** payment_method, total_donations, total_amount, average_amount
- **What database returned:** included extra count_by_method field not in contract
- **Fix:** Removed count_by_method from the SELECT query and response mapping
- **Contract change:** No — implementation was fixed, contract was correct

#### 6. donations/summary — total_amount and average_amount fields
- **Original contract:** number (double)
- **What database returned:** string ("12500.00", "3125.000000")
- **Fix:** Added parseFloat() in summary mapping
- **Contract change:** No — implementation was fixed, contract was correct

### Summary
- Total deviations found: 6
- Deviations fixed in implementation: 6
- Contract changes required: 0
- All GET endpoints now return responses that match openapi.yaml exactly
