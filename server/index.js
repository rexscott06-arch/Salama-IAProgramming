const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8')
)
console.log('Swagger loaded successfully:', Object.keys(swaggerDocument))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
  res.send('Salama API is running')
})

const userRoutes = require('./routes/users')
const incidentRoutes = require('./routes/incidents')
const resourceRoutes = require('./routes/resources')
const donationRoutes = require('./routes/donations')
const volunteerRoutes = require('./routes/volunteers')

app.use('/api/users', userRoutes)
app.use('/api/incidents', incidentRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/donations', donationRoutes)
app.use('/api/volunteers', volunteerRoutes)

app.listen(PORT, () => {
  console.log(`Salama server running on http://localhost:${PORT}`)
})