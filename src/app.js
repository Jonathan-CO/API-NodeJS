const express = require ('express')

const config = require('./config')
const app = express()
const router = express.Router()

const mongoose = require('../bin/db')

const User = require('./models/User')
const Group = require('./models/Group')
const Event = require('./models/Event')
//const Work = require('./models/Work')

//Carrega rotas
const indexRoute = require('./routes/index-route')
const userRoute = require('./routes/user-route')
const groupRoute = require('./routes/group-route')
const eventRoute = require('./routes/event-route')

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/', indexRoute)
app.use('/users', userRoute)
app.use('/groups', groupRoute)
app.use('/events', eventRoute)

module.exports = app