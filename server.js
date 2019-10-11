const http = require ('http')
const express = require ('express')
const debug = require ('debug')('nodestr:server')

const app = express()
const port = 3000
app.set('port', port)



const server = http.createServer(app)
const router = express.Router()

const route = router.get('/', (req, res, next)=>{
    res.send({
        title: "Node Store API",
        version: '0.0.1'
    });
});

app.use('/', route)

server.listen(port)
console.log("ok")