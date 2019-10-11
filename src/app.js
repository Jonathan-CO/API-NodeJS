const express = require ('express')

const app = express()
const router = express.Router()

//Carrega rotas
const indexRoute = require('./routes/index-route')
const pessoaRoute = require('./routes/pessoa-route')

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/', indexRoute)
app.use('/pessoa', pessoaRoute)

module.exports = app