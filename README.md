# Salama

The application is split into two independent projects:

- `Client/` contains the React/Vite web application.
- `server/` contains the Express API, database setup, API documentation, and
  server tests.

## Run locally

Requirements: Node.js and MySQL. Install dependencies once in each project:

```powershell
npm --prefix server install
npm --prefix Client install
```

Configure `server/.env` with the MySQL connection settings, then create the
database tables using the instructions in [server/README.md](server/README.md).
Start the API and client in separate terminals from this repository root:

```powershell
npm --prefix server run dev
npm --prefix Client run dev
```

The API is available at `http://localhost:5000` and its interactive docs are at
`http://localhost:5000/api-docs`. Vite normally serves the client at
`http://localhost:5173` and proxies `/api` requests to the local API. Set
`VITE_API_PROXY_TARGET` in the client environment to change the development API
target. For a deployed client, configure `VITE_API_URL`.

## Faraja partner feature

The client has a **Community Events** page at `/community-events`. It uses
sample events in demo mode, and its banner explains that proposals are not sent
or saved. The page follows Faraja's contract: `GET /memorial-events` and
`POST /awareness-activities`.

The Faraja project you shared already contains these contract routes. To try
the live connection, configure and start the Faraja backend and database using
Faraja's README. Faraja and Salama both default to port 5000, so start Faraja on
port 5001. In a Faraja terminal:

```powershell
cd C:\Users\mathi\OneDrive\Desktop\faraja-webapp\js\Backend
$env:PORT = "5001"
npm start
```

In another terminal, start Salama's client in live mode:

```powershell
$env:VITE_FARAJA_API_MODE = "live"
$env:VITE_FARAJA_API_PROXY_TARGET = "http://127.0.0.1:5001"
npm --prefix C:\Users\mathi\OneDrive\Desktop\Salama-IAProgramming\Client run dev
```

Then open `http://localhost:5173/community-events`. Vite forwards requests
through `/faraja-api` to Faraja. In production, set
`VITE_FARAJA_API_MODE=live` and `VITE_FARAJA_API_URL` to Faraja's base URL; the
Faraja API must allow the deployed site through CORS or be accessed through a
server-side proxy. Keep demo mode enabled until the real API is running.

## Checks

Run the client production build and server tests with:

```powershell
npm --prefix Client run build
npm --prefix server test
```
