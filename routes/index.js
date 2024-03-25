const express = require('express')
const router = express.Router()
const apiRouter = express.Router()

const userRoutes = require('./user-routes.js')
const authRoutes = require('./auth-routes.js')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/openapi.json')

// const passport = require('passport')
router.use('/api', apiRouter)

apiRouter.use('/users', userRoutes)
apiRouter.use('/auth', authRoutes)
apiRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = router
