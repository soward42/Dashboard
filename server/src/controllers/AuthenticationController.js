const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7 * 30
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {

  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use'
      })
    }
  },

  async unregister (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        res.status(403).send({
          error: 'User not found'
        })
      }
      const isPasswordValid = user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Invalid password'
        })
      }
      res.send({
        message: 'User unregistered'
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'An error occured trying to unregister'
      })
    }
  },

  async login (req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })
      if (!user) {
        res.status(403).send({
          error: 'User not found'
        })
      }
      const isPasswordValid = user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Invalid password'
        })
      }
      const userJson = user.toJSON()
      const token = jwtSignUser(userJson)
      user.updateAttributes({
        loginToken: token
      })
      res.send({
        user: userJson,
        token: token
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'An error occured trying to log in'
      })
    }
  }

}
