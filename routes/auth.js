const express = require('express')
const router = express.Router()
const { auth: ctrl } = require('../controllers')
const { controllerWrapper, validation } = require('../middlewares')

router.post('/signup', controllerWrapper(ctrl.signup))

router.post('/login', controllerWrapper(ctrl.login))

router.get('/logout', controllerWrapper(ctrl.logout))

router.get('/current', controllerWrapper(ctrl.current))

module.exports = router
