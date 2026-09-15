const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Salama API is running');
});

const userRoutes = require('./routes/users');
const incidentRoutes = require('./routes/incidents');
const resourceRoutes = require('./routes/resources');
const donationRoutes = require('./routes/donations');
const volunteerRoutes = require('./routes/volunteers');

app.use('/api/users', userRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/volunteers', volunteerRoutes);

app.listen(PORT, () => {
  console.log(`Salama server running on http://localhost:${PORT}`);
});