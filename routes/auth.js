const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/auth.js')

// Middleware for logging request and response
authRouter.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  // console.log('Request Headers:', req.headers)
  next()
})

authRouter.get(
  '/login',
  // #swagger.summary = 'login in using GitHub'
  // #swagger.tags = ['auth']
  // #swagger.description = 'the /api/auth/login route should be accessed directly in the browser, not via AJAX.'
  authController.login,
)

authRouter.get(
  '/logout',
  // #swagger.summary = 'logout'
  // #swagger.tags = ['auth']
  authController.logout,
)

authRouter.get(
  '/github/callback',
  // #swagger.ignore = true
  authController.githubCallback,
)

module.exports = authRouter
