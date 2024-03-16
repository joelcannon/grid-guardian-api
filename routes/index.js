const express = require('express')
const router = express.Router()
const userRoutes = require('./user.js')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/openapi.json')

router.use('/users', userRoutes)
router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', [
  // #swagger.description = 'get OpenAPI 3.0 docs'
  // #swagger.tags = ['OpenAPI']
  swaggerUi.setup(swaggerDocument),
])

module.exports = router
