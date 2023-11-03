import 'dotenv/config'
const express = require('express')
const cors = require('cors')
const router = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use('/', router);

app.listen(process.env.PORT || 9000, () => console.log(`Listening on port ${process.env.PORT || 9000}!`))
