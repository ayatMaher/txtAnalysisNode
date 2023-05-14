const {Router} = require('express')
const {authController} = require('../controllers')

const router = Router()
router.post('/signUp', authController.signUp)
    .post('/logIn', authController.logIn)

module.exports = router