*1.* "Group 14 (Consumer team) needs to *read Market price* filtered by Type of product in order to display the current price per kg when a buyer selects a product."

- Freshness: Real-time / updated within 5 mins
- Volume: High - called on every product page load / search
- Auth: No - public data

*2.* "Group 14 (Consumer team) needs to *read Farmer Rating and User name* in order to show seller trust score and name when a buyer uses Select seller."

- Freshness: Updated within the hour 
- Volume: High - called whenever seller list is viewed
- Auth: Yes - requires buyer authentication

*3.* "Group 14 (Consumer team) needs to *read a list of Active listings* filtered by Type of product and Number of goods in order to show only available produce when a user selects buyer role."

- Freshness: Real-time
- Volume: Very high - main marketplace feed, called constantly
- Auth: Yes - buyer must be logged in

*4.* "Group 14 (Consumer team) needs to *read Headquarters* for a given User name in order to calculate delivery distance and ETA after Select buyer / Select seller."

- Freshness: updated daily
- Volume: Medium - called at checkout / transaction
- Auth: Yes - location is sensitive

*5.* "Group 14 (Consumer team) needs to *read Total Earnings* grouped by User role in order to display earnings dashboard for a farmer/seller."

- Freshness: Updated within the hour 
- Volume: Low - once per dashboard load
- Auth: Yes - highly sensitive, requires owner auth

*6.* "Group 14 (Consumer team) needs to *read User role* for a given User name in order to block Select buyer action for users registered as sellers and vice versa."

- Freshness: Real-time at login
- Volume: Low - once per session
- Auth: Yes

- Part F — Reflection

The most surprising thing from the partner interview was the difference between what Group 14 expected from our API and what Salama currently provides. Group 14 expected information 
related to farmers and a marketplace, such as market prices, farmer ratings, buyers, sellers, products, active listings and total earnings. However, these resources are not part of 
our current Salama application, which focuses mainly on GBV reporting, support services, cases, users and donations. This showed us why it is important to interview the downstream 
team before designing the API instead of assuming that all requested information already exists. We also learned that information such as donations and financial transactions needs 
to be kept up to date and protected because it is sensitive. The interview therefore helped us identify both the actual resources we can expose and the gaps that need to be communicated before moving to API design.
