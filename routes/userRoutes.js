const routes = require('express').Router()
const UserController = require('../controllers/userController')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.post('/googleLogin', UserController.googleLogin)

module.exports = routes