const express = require('express')
const router = express.Router()

router.post('/', (req, res, next)=>{
    res.status(201).send(req.body) // status 201 = created
    console.log(req.body)
});

router.put('/:id', (req, res, next)=>{
    const id = req.params.id
    res.status(200).send({ // status 201 = created
        id: id,
        item: req.body 
    })
});

router.delete('/', (req, res, next)=>{
    res.status(200).send(req.body) // status 201 = created
});

module.exports = router