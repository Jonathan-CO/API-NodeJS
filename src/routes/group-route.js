const express = require('express')
const router = express.Router()

const controller = require('../controllers/group-controller')
const authService = require('../services/auth-services')

router.get('/', controller.get);
router.post('/', authService.authorize, controller.post);

module.exports = router