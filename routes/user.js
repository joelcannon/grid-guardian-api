const userRouter = require('express').Router()
const userController = require('../controllers/user.js')

userRouter.get('/', [
  // #swagger.description = 'get all Users'
  // #swagger.tags = ['users']
  userController.getAllUsers,
])

userRouter.get('/:id', [
  // #swagger.description = 'get a single User by id'
  // #swagger.tags = ['users']
  userController.getUserById,
])

userRouter.post('/', [
  // #swagger.description = 'Add a new user'
  // #swagger.tags = ['users']
  userController.createUser,
])

userRouter.put('/:id', [
  // #swagger.description = 'update a User by id'
  // #swagger.tags = ['users']
  userController.updateUserById,
])

userRouter.delete('/:id', [
  // #swagger.description = 'delete a single User by id'
  // #swagger.tags = ['users']
  userController.deleteUserById,
])

userRouter.delete('/', [
  // #swagger.description = 'delete all Users'
  // #swagger.tags = ['users']
  userController.deleteAllUsers,
])

userRouter.use(userController.errorHandler)

module.exports = userRouter
