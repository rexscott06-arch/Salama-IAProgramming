# Salama API

## Overview
Salama is a Gender-Based Violence (GBV) awareness and support API built for Kenya. It enables anonymous incident reporting, resource discovery (shelters, hotlines, legal aid, medical), volunteer registration, and donation processing. It is intended for use by survivors, NGO staff, and developers building GBV-support applications.

---

## How to Run Locally

Requirements: Node.js, MySQL running locally

    git clone <your-repo-url>
    cd server
    npm install

Create a .env file in the server/ directory:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=salama_db
    DB_PORT=3306
    PORT=5000

Start the server:

    node index.js

API will be available at: http://localhost:5000
Interactive docs: http://localhost:5000/api-docs

---

## Authentication

Authentication is not yet enforced (arriving in Week 9). All endpoints are currently open. When auth is added, requests will require a Bearer token:

    Authorization: Bearer <token>

---

## Endpoints and Examples

### Incidents

GET /api/incidents - List all reported incidents

    curl http://localhost:5000/api/incidents

Response 200:

    [{"id":1,"case_ref":"SAL-00001","incident_type":"physical","incident_date":"2026-01-15","county":"nairobi","description":"Incident description here","status":"open","is_anonymous":true}]

POST /api/incidents - Report a new incident

    curl -X POST http://localhost:5000/api/incidents -H "Content-Type: application/json" -d '{"case_ref":"SAL-12345","incident_type":"physical","incident_date":"2026-10-01","county":"nairobi","description":"Description of the incident","is_anonymous":true}'

Response 201:

    {"id":10,"case_ref":"SAL-12345","incident_type":"physical","incident_date":"2026-10-01","county":"nairobi","description":"Description of the incident","status":"open","is_anonymous":true}

PATCH /api/incidents/:id/status - Update incident status

    curl -X PATCH http://localhost:5000/api/incidents/1/status -H "Content-Type: application/json" -d '{"status":"in_review"}'

Response 200:

    {"id":1,"status":"in_review"}

---

### Resources

GET /api/resources - List all support resources

    curl http://localhost:5000/api/resources

POST /api/resources - Add a new resource

    curl -X POST http://localhost:5000/api/resources -H "Content-Type: application/json" -d '{"name":"Kisumu Shelter","type":"shelter","county":"kisumu","description":"Emergency shelter for GBV survivors","contact":"0712345678","available":"24/7"}'

Response 201:

    {"id":7,"name":"Kisumu Shelter","type":"shelter","county":"kisumu","description":"Emergency shelter for GBV survivors","contact":"0712345678","available":"24/7"}

---

### Donations

GET /api/donations - List all donations

    curl http://localhost:5000/api/donations

GET /api/donations/summary - Get donation totals

    curl http://localhost:5000/api/donations/summary

Response 200:

    {"total_amount":15000.00,"total_count":5,"average_amount":3000.00}

POST /api/donations - Record a donation

    curl -X POST http://localhost:5000/api/donations -H "Content-Type: application/json" -d '{"donor_name":"Jane Doe","amount":1000,"payment_method":"mpesa","transaction_ref":"MPE123456","is_anonymous":false}'

Response 201:

    {"id":10,"donor_name":"Jane Doe","amount":1000.00,"payment_method":"mpesa","transaction_ref":"MPE123456","is_anonymous":false}

---

### Volunteers

GET /api/volunteers - List all volunteer applications

    curl http://localhost:5000/api/volunteers

POST /api/volunteers - Submit a volunteer application

    curl -X POST http://localhost:5000/api/volunteers -H "Content-Type: application/json" -d '{"name":"Alice Wanjiru","email":"alice@example.com","phone":"0722000000","county":"nairobi","role":"counselor","availability":"weekends","experience":"3 years NGO work","motivation":"I want to support survivors in my community"}'

Response 201:

    {"id":10,"name":"Alice Wanjiru","email":"alice@example.com","phone":"0722000000","county":"nairobi","role":"counselor","availability":"weekends","status":"pending"}

PATCH /api/volunteers/:id/status - Update volunteer status

    curl -X PATCH http://localhost:5000/api/volunteers/1/status -H "Content-Type: application/json" -d '{"status":"approved"}'

Response 200:

    {"id":1,"status":"approved"}

---

### Users

GET /api/users - List all users

    curl http://localhost:5000/api/users

GET /api/users/:id - Get a user by ID

    curl http://localhost:5000/api/users/1

Response 200:

    {"id":1,"name":"Admin User","email":"admin@salama.org","role":"admin"}

---

## Error Format

All errors return JSON in this shape:

    {"error":"Description of what went wrong"}

Common errors:

    400 - Missing or invalid field
    {"error":"incident_type must be one of: physical, sexual, emotional, economic, other"}

    404 - Resource not found
    {"error":"Incident not found"}

    500 - Server error
    {"error":"Internal server error"}

---

## Interactive Docs

Full API documentation with live request testing:

    http://localhost:5000/api-docs
