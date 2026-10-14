# **API Endpoint List - Group 13(Salama)**

| Method | Path | Purpose | Maps to Need |
| :---- | :---- | :---- | :---- |
| GET | /support-services?county={county} | Return a list of emergency support services, filterable by county. | 1\. "...read Support Services filtered by county in order to display a local emergency safety directory..." |
| GET | /support-services/{id} | Retrieve full details, location, and emergency contact information for a specific support service. | 1. "...read Support Services..." *(Implied single-item view after browsing the directory)* |
| GET | /service-providers?status=available | Return a list of vetted service organizations, filterable by current availability. | 2. "...read Service Providers filtered by availability in order to connect farmers with vetted organizations..." |
| GET | /service-providers/{id} | Retrieve full profiles of specific service providers for legal or counseling connections. | 2. "...read Service Providers..." *(Implied single-item view before making a connection)* |
| POST | /incident-reports | Submit a new incident report (e.g., Economic Abuse) directly into Salama's system. | 3. "...create an Incident Report categorized as 'Economic Abuse' in order to allow female farmers to report..." |



//It has consistent pluralization, it uses nouns correctly. Correct use of https verbs as well. Correct path structures. There are no errors made.