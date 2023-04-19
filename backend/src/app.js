const express = require('express');
const router = require('./router')
const bodyParser = require('body-parser')
require('dotenv').config()
const cookieParser = require('cookie-parser')


const banco = require('./models/connection')
const users = require('./models/users')

const app = express();
app.use(bodyParser.json())
app.use(cookieParser)
app.use(router)







module.exports = app;
