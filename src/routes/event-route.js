const express = require('express')
const router = express.Router()

const controller = require('../controllers/event-controller')
const authService = require('../services/auth-services')

router.get('/', authService.isAdmin, controller.get);
router.post('/', authService.isAdmin, controller.post);

module.exports = router