const routes = require('express').Router()
const userRoutes = require('./userRoutes')
const taskRoutes = require('./taskRoutes')

//user
routes.use('/user', userRoutes)
//task
routes.use('/task',taskRoutes)

module.exports = routes
