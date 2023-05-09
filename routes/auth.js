const {Router} = require('express')
const {authController} = require('../controllers')
//
const router = Router()
router.post('/signUp', authController.signUp)
//
//
module.exports = router