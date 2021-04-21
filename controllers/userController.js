const {User} = require('../models/index')
let {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static register (req,res,next) {
    let inputUser = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(inputUser)
    .then(user => {
      let newUser = {
        id: user.id,
        email: user.email
      }
      res.status(201).json(newUser)
    })
    .catch(err=>{
      err.from = "register UserController"

      next(err)
    })
  }

  static login (req,res,next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if(!user) throw {msg: "invalid email/password"}
      const comparedPass = comparePass(req.body.password, user.password)
      if(!comparedPass) throw {msg: "invalid email/password"}
      let access_token = generateToken({
        id: user.id,
        email: user.email
      })
      res.status(200).json({access_token})
    })
    .catch(err=>{
      err.from = "login UserController"

      next(err)
    })
  }
  static googleLogin(req,res,next) {
		const client = new OAuth2Client(process.env.CLIENT_ID); 
		let email = ''
		client.verifyIdToken({
			idToken : req.body.googleToken,
			audience: process.env.CLIENT_ID
		})
		.then(ticket => {
			const payload = ticket.getPayload()
			email = payload.email

			return User.findOne( { where: {email:email}})
		})
		.then(user => {
			if (user) {
				//generate token
				const access_token = generateToken({
					id: user.id,
					email: user.email
				})
				res.status(200).json({access_token:access_token})
			} else {
				return User.create({
					email: email,
					password: '123456'
				})
			}
		})
		.then(registeredUser => {
			const access_token = generateToken({
				id: registeredUser.id,
				email: registeredUser.email
			})
			res.status(201).json({access_token:access_token})
		})
		.catch(err=>{
      err.from = "googleLogin UserController"

			next(err)
		})
	}
}

module.exports = UserController
