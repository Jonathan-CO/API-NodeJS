const express = require('express')
const router = express.Router()

const controller = require('../controllers/usuario-controller')

router.get('/', controller.get);

router.get('/:id', controller.getById);

router.get('/tags/:tag', controller.getByTag); //need "/tags" - conflito /:id)

router.post('/', controller.post);

router.put('/:id', controller.put);

router.delete('/', controller.delete);

module.exports = router