const {Task} = require('../models/index')

class TaskController {
  static getAllTask(req,res,next) {
    Task.findAll()
    .then(tasks => {
      let container = {
        backlog: [],
        todo: [],
        doing: [],
        done: []
      }
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].category == 'backlog') {
          container.backlog.push(tasks[i])
        } else if (tasks[i].category == 'todo') {
          container.todo.push(tasks[i])
        } else if(tasks[i].category == 'doing') {
          container.doing.push(tasks[i])   
        } else if (tasks[i].category == 'done') {
          container.done.push(tasks[i])
        }
      }
      res.status(200).json(container)
    })
    .catch(err=>{
      err.from = "getAllTask TaskController"
      next(err)
    })
  }
  static findOneTask(req, res, next) {
    Task.findByPk(+req.params.id)
    .then(task=>{
      res.status(200).json(task)
    })
    .catch(err=>{
      err.from = "findOneTask TaskController"
      next(err)
    })
  }
  static addTask(req,res, next) {
    let newTask = {
      title: req.body.title,
      category: req.body.category,
      UserId: +req.decoded.id,
      owner: req.decoded.email
    }
    Task.create(newTask)
    .then(task=>{
      res.status(201).json(task)
    })
    .catch(err=>{
      err.from = "addTask TaskController"

      next(err)
    })
  }

  static putTask (req, res, next ) {
    let updateTask = {
      title: req.body.title,
      category: req.body.category,
    }
    Task.update(updateTask, {where:{id: +req.params.id}, returning: true})
    .then(task=>{
      res.status(200).json(task)
    })
    .catch(err=>{
      err.from = "putTask TaskController"

      next(err)
    })
  }

  static patchTask (req,res,next) {
    let patchTask = {
      category: req.body.category
    }
    Task.update(patchTask, {where:{id: +req.params.id}, returning: true})
    .then(task=>{
      res.status(200).json(task)
    })
    .catch(err=>{
      err.from = "patchTask TaskController"

      next(err)
    })
  }
  static destroyTask (req,res,next) {
    Task.destroy({
      where: {
        id: +req.params.id
      }
    })
    .then(task=>{
      res.status(200).json({msg: "Task deleted successfully!"})
    })
    .catch(err=>{
      err.from = "destroyTask TaskController"

      next(err)
    })
  }
}

module.exports = TaskController