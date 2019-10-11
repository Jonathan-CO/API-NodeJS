const http = require ('http')
const express = require ('express')
const debug = require ('debug')('nodestr:server')

const app = express()
const port = normalizePort(process.env.PORT || 3000)
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
server.on('listening', onListening)

console.log('ok')
function normalizePort(val){ // baseada no gerador de código do express
    const port = parseInt(val, 10); // valor na base 10
    if(isNaN(port)){
        return val
    }
    if (port>= 0){
        return port
    }
    return false
}

function onListening(){
    const addr = server.address()
    const bind = typeof addr == 'string' ? 'pipe ' + addr : 'port ' + addr.port
    debug('Listening on '+bind);
}
