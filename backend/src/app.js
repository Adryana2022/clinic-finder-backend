const express = require('express');
const router = require('./router')
const bodyParser = require('body-parser')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')


const banco = require('./models/connection')
const users = require('./models/users')
const clinicas = require('./models/clinicas')

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(router)







module.exports = app;
