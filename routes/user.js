const userRouter = require('express').Router()
const userController = require('../controllers/user.js')

userRouter.get(
  '/',
  // #swagger.description = 'use this as the API key = Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  // #swagger.summary = 'get all Users'
  // #swagger.tags = ['users']
  userController.getAllUsers,
)

userRouter.get(
  '/:id',
  // #swagger.parameters['id'] = {
  //   in: 'path',
  //   description: 'ID of the user to retrieve',
  //   required: true,
  //   type: 'string'
  // }
  // #swagger.summary = 'get a single User by id'
  // #swagger.tags = ['users']
  userController.getUserById,
)

userRouter.post(
  '/',
  // #swagger.parameters['newUser'] = {
  //   in: 'body',
  //   description: 'Information for the new user.',
  //   required: true,
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       username: { type: 'string', example: 'joelcannon' },
  //       email: { type: 'string', example: 'joelcannon@mac.com' },
  //       password: { type: 'string', example: 'password' },
  //       firstName: { type: 'string', example: 'Joel' },
  //       lastName: { type: 'string', example: 'Cannon' },
  //       role: { type: 'string', example: 'Admin' },
  //       phone: { type: 'string', example: '+15412440897' }
  //     }
  //   }
  // },
  // #swagger.responses[201] = {
  //   description: 'User created successfully',
  //   schema: {
  //     $ref: '#/definitions/User'
  //   },
  //   examples: {
  //     'application/json': {
  //       id: '5f8f8c3d3b9f40a361eb7790',
  //       // other fields...
  //     }
  //   },
  //   links: {
  //     GetUserById: {
  //       operationId: 'getUserById',
  //       parameters: {
  //         id: '$response.body#/id'
  //       }
  //     }
  //   }
  // },
  // #swagger.summary = 'Add a new User',
  // #swagger.tags = ['users'],
  userController.createUser,
)

userRouter.put(
  '/:id',
  // #swagger.summary = 'update a User by id'
  // #swagger.tags = ['users']
  userController.updateUserById,
)

userRouter.delete(
  '/:id',
  // #swagger.summary = 'delete a single User by id'
  // #swagger.tags = ['users']
  userController.deleteUserById,
)

userRouter.delete(
  '/',
  // #swagger.summary = 'delete all Users'
  // #swagger.tags = ['users']
  userController.deleteAllUsers,
)

// userRouter.use(userController.errorHandler)

module.exports = userRouter
