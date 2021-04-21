const routes = require('express').Router()
const TaskController = require('../controllers/taskController')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

routes.use(authenticate)
routes.get('/', TaskController.getAllTask)
routes.post('/', TaskController.addTask)
routes.use("/:id", authorize)
routes.get('/:id', TaskController.findOneTask)
routes.put('/:id', TaskController.putTask)
routes.patch('/:id', TaskController.patchTask)
routes.delete('/:id', TaskController.destroyTask)

module.exports = routes