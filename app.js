if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")
const routes = require('./routes/index')
const errorHandler = require('./helpers/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routes)

app.use(errorHandler)

app.listen(port, ()=>{console.log("runing on port", port);})