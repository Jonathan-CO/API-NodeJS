const express = require('express')
const router = express.Router()

const controller = require('../controllers/user-controller')
const authService = require('../services/auth-services')

router.get('/', controller.get);

router.get('/:id', controller.getById);

router.get('/tags/:tag', controller.getByTag); //need "/tags" - conflito /:id)

router.post('/', controller.post);

router.put('/:id', controller.put);

router.delete('/:id', controller.delete);

router.post('/authenticate', controller.authenticate);

router.post('/refresh-token', authService.authorize, controller.refreshToken);



module.exports = router