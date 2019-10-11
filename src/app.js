const express = require ('express')

const app = express()
const router = express.Router()

const mongoose = require('../bin/db')

const Usuario = require('./models/Usuario')

//Carrega rotas
const indexRoute = require('./routes/index-route')
const usuarioRoute = require('./routes/usuario-route')

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/', indexRoute)
app.use('/usuario', usuarioRoute)

module.exports = app