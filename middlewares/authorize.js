const { Task } = require('../models/index')

function authorize(req,res,next) {
  Task.findOne({
    where: {
      id: +req.params.id
    }
  })
  .then(task =>{
    if(!task) throw {msg: "Task not found!", status: 404}
    if (+task.UserId == +req.decoded.id) {
      next()
    } else {
      throw {msg: "Unauthorize!", status: 401}
    }
  })
  .catch(err=>{
    err.from = "authorize middleware"
    next(err)
  })
}

module.exports = authorize