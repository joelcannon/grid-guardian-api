const express = require('express')
const router = express.Router()
const apiRouter = express.Router()

const userRoutes = require('./user.js')
const authRoutes = require('./auth.js')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/openapi.json')

// const passport = require('passport')
router.use('/api', apiRouter)

apiRouter.use('/users', userRoutes)
apiRouter.use('/auth', authRoutes)
apiRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// router.get('/login', passport.authenticate('github'), (req, res) => {})

// router.get('/logout', (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err)
//     }
//     res.redirect('/')
//   })
// })

module.exports = router
