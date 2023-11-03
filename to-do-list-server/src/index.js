import 'dotenv/config'
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.static('dist'))
app.get('/todo-list', (req, res) => res.send({data: []}))

app.listen(process.env.PORT || 9000, () => console.log(`Listening on port ${process.env.PORT || 9000}!`))
