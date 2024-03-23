const express = require('express')
const userRoutes = require('./user.js')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/openapi.json')
const router = express.Router()

router.use('/users', userRoutes)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

router.get('/login', passport.authenticate('github'), (req, res) => {})

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

module.exports = router
