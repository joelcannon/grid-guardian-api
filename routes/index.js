const express = require('express')
const userRoutes = require('./user.js')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/openapi.json')
const router = express.Router()

router.use('/users', userRoutes)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = router
