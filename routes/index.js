const express = require('express')
const router = express.Router()
const userRoutes = require('./user.js')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger-output.json')

router.use('/users', userRoutes)
router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument))

module.exports = router
