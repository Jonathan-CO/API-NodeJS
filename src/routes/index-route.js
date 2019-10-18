const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    res.status(200).send({ //status 200 = OK
        title: "Node Store API",
        version: '1.0.0',
        About: "Esta API foi desenvolvida com NodeJS e tem como objetivo..."
    });
});

module.exports = router