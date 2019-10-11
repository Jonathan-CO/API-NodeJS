const express = require ('express')

const app = express()
const router = express.Router()

app.use(express.urlencoded({extended: true}))
app.use(express.json())


const route = router.get('/', (req, res, next)=>{
    res.status(200).send({ //status 200 = OK
        title: "Node Store API",
        version: '0.0.1'
    });
});

const create = router.post('/', (req, res, next)=>{
    res.status(201).send(req.body) // status 201 = created
    console.log(req.body)
});


const put = router.put('/:id', (req, res, next)=>{
    const id = req.params.id
    res.status(200).send({ // status 201 = created
        id: id,
        item: req.body 
    })
});

const del = router.delete('/', (req, res, next)=>{
    res.status(200).send(req.body) // status 201 = created
});

app.use('/', route)
app.use('/teste', create)
app.use('/teste', put)
app.use('/teste', del)

module.exports = app