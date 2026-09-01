# **API Endpoint List - Group 13(Salama)**

| Method | Path | Purpose | Maps to Need |
| :---- | :---- | :---- | :---- |
| GET | /market-prices?productType={type} | Return current market prices, filterable by product type. | 1. "...read Market price filtered by Type of product..." |
| GET | /sellers/{id} | Return seller details, including their trust rating/score and username. | 2. "...read Farmer Rating and User name in order to show seller trust score..." |
| GET | /listings?status=active\&productType={type}\&minGoods={number} | Return available marketplace produce listings, filterable by type and quantity. | 3. "...read a list of Active listings filtered by Type of product and Number of goods..." |
| POST | /listings | Create a new produce listing on the marketplace. | *Implied companion to Need 3 (read active listings) to fulfill write endpoint requirement.* |
| GET | /users/{username}/headquarters | Return the delivery headquarters/location for a specific user to calculate delivery ETA. | 4. "...read Headquarters for a given User name in order to calculate delivery distance..." |
| GET | /users/{id}/earnings | Return total earnings for a specific user (farmer/seller) to populate their dashboard. | 5. "...read Total Earnings grouped by User role in order to display earnings dashboard..." |
| GET | /users/{username}/role | Return the registered role (buyer/seller) of a user to authorize specific actions. | 6. "...read User role for a given User name in order to block Select buyer action..." |


//It has consistent pluralization, it uses nouns correctly. Correct use of https verbs as well. Correct path structures. There are no errors made.
