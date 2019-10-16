const express = require ('express')

const app = express()
const router = express.Router()

const mongoose = require('../bin/db')

const User = require('./models/User')
const Group = require('./models/Group')
const Event = require('./models/Event')
const Work = require('./models/Work')

//Carrega rotas
const indexRoute = require('./routes/index-route')
const userRoute = require('./routes/user-route')

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/', indexRoute)
app.use('/users', userRoute)

module.exports = app