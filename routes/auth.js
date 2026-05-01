const express = require('express')
const { signUp, signIn, getUserProfile } = require('../controllers/authController')
const { authMiddleware } = require('../middleware/authMiddleware')
const route = express.Router()

route.post('/signup',signUp)
route.post('/signin',signIn)
route.get('/profile',authMiddleware,getUserProfile)

module.exports = route