const express = require ('express')
const app = express()
const router = express.Router()

const mongoose = require('../bin/db')

const User = require('./models/User')
const Group = require('./models/Group')
const Event = require('./models/Event')

//Carrega rotas
const indexRoute = require('./routes/index-route')
const userRoute = require('./routes/user-route')
const groupRoute = require('./routes/group-route')
const eventRoute = require('./routes/event-route')

app.use(express.urlencoded({extended: true}))
app.use(express.json())


//Habilita CORS
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})



app.use('/', indexRoute)
app.use('/users', userRoute)
app.use('/groups', groupRoute)
app.use('/events', eventRoute)



module.exports = app