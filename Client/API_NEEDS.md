1. "ShambaDirect needs to read Support Services filtered by county in order to display a local emergency safety directory for farmers."

Freshness: Updated weekly
Volume: Low - called only when the safety tab is opened
Auth: No - public data

2. "ShambaDirect needs to read Service Providers filtered by availability in order to connect farmers with vetted organizations for legal or counseling services."

Freshness: Updated monthly
Volume: Low
Auth: No - public data

3. "ShambaDirect needs to create an Incident Report categorized as 'Economic Abuse' in order to allow female farmers to report Saccos, partners, or buyers who are weaponizing withheld funds as a form of gender-based control."

Freshness: Real-time
Volume: Low
Auth: Yes - requires secure API key to write to Salama's database

- Part F — Reflection

The most surprising thing from the partner interview was the difference between what Group 14 expected from our API and what Salama currently provides. Group 14 expected information 
related to farmers and a marketplace, such as market prices, farmer ratings, buyers, sellers, products, active listings and total earnings. However, these resources are not part of 
our current Salama application, which focuses mainly on GBV reporting, support services, cases, users and donations. This showed us why it is important to interview the downstream 
team before designing the API instead of assuming that all requested information already exists. We also learned that information such as donations and financial transactions needs 
to be kept up to date and protected because it is sensitive. The interview therefore helped us identify both the actual resources we can expose and the gaps that need to be communicated before moving to API design.
