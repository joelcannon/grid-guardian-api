const express = require('express')
const authRouter = express.Router()
const passport = require('passport')

// Middleware for logging request and response
authRouter.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  console.log('Request Headers:', req.headers)
  next()
})

authRouter.get(
  '/login',
  // #swagger.summary = 'login in using GitHub'
  // #swagger.tags = ['auth']
  passport.authenticate('github'),
  (req, res) => {
    console.log('Response:', res)
  },
)

authRouter.get(
  '/logout',
  // #swagger.summary = 'logout'
  // #swagger.tags = ['auth']
  (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err)
      }
      res.redirect('/')
    })
  },
)

authRouter.get(
  '/github/callback',
  // #swagger.ignore = true
  (req, res, next) => {
    passport.authenticate(
      'github',
      {
        failureRedirect: '/api-docs',
        session: true,
      },
      (err, user, info) => {
        if (err) {
          console.log('Authentication error:', err)
          return next(err)
        }
        if (!user) {
          console.log('Authentication failed:', info)
          return res.redirect('/api-docs')
        }
        req.logIn(user, (err) => {
          if (err) {
            console.log('Error logging in:', err)
            return next(err)
          }
          console.log('GitHub OAuth callback hit. User data:', user)
          req.session.user = user
          res.redirect('/')
        })
      },
    )(req, res, next)
  },
)

module.exports = authRouter
