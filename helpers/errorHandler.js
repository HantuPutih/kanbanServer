module.exports = (err, req, res, next) => {
  if (err.name == 'SequelizeValidationError') { 
    const error = err.errors[0].message  
    res.status(400).json({error})
  }if (err.from == "login UserController") {
    const error = err.msg
    res.status(500).json({error})
  } else if(err.from == 'authorize middleware') {
    const error = err.msg
    if (err.msg == 'Unauthorize!') {
    res.status(401).json({error})
    } else {
      res.status(404).json({error})
    }
  } else {
    res.status(500).json({msg: 'internal server error'})
  }
}