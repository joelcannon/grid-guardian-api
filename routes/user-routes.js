const userRouter = require('express').Router()
const userController = require('../controllers/user-controller.js')
const { isAuthenticated } = require('../middlewares/is-authenticated.js')

userRouter.get(
  '/',
  // #swagger.description = 'use this as the API key = Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  // #swagger.summary = 'get all Users'
  // #swagger.tags = ['users']
  userController.getAllUsers,
)

userRouter.get(
  '/:id',
  /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID of the user to retrieve',
    required: true,
    type: 'string'
   } */
  // #swagger.summary = 'get a single User by id'
  // #swagger.tags = ['users']
  userController.getUserById,
)

userRouter.post(
  '/',
  // #swagger.summary = 'Add a new User',
  // #swagger.tags = ['users'],
  isAuthenticated,
  (req, res, next) => {
    console.log(req.body)
    next()
  },
  userController.createUser,
)

userRouter.put(
  '/:id',
  // #swagger.summary = 'update a User by id'
  // #swagger.tags = ['users']
  isAuthenticated,
  userController.updateUserById,
)

userRouter.delete(
  '/:id',
  // #swagger.summary = 'delete a single User by id'
  // #swagger.tags = ['users']
  isAuthenticated,
  userController.deleteUserById,
)

userRouter.delete(
  '/',
  // #swagger.summary = 'delete all Users'
  // #swagger.tags = ['users']
  isAuthenticated,
  userController.deleteAllUsers,
)

userRouter.patch(
  '/:id/toggleActiveStatus',
  // #swagger.summary = 'toggle a User active status by id'
  // #swagger.tags = ['users']
  isAuthenticated,
  userController.toggleUserActiveStatus,
)

// userRouter.use(userController.errorHandler)

module.exports = userRouter

/* #swagger.parameters['newUser'] = {
    in: 'body',
    description: 'Information for the new user.',
    required: true,
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'joelcannon'
        },
        email: {
          type: 'string',
          example: 'joelcannon@mac.com'
        },
        role: {
          type: 'string',
          example: 'Admin'
        }
      }
    }
  } */
