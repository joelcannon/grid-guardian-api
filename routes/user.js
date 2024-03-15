const userRouter = require('express').Router()
const userController = require('../controllers/user.js')

userRouter.get('/', userController.getAllUsers)
// #swagger.description = 'get all Users'
// #swagger.tags = ['users']

userRouter.get('/:id', userController.getUserById)
// #swagger.description = 'get a single User by id'
// #swagger.tags = ['users']

userRouter.post('/', userController.createUser)
// #swagger.description = 'add a new User'
// #swagger.tags = ['users']

userRouter.put('/:id', userController.updateUserById)
// #swagger.description = 'update a User by id'
// #swagger.tags = ['users']

userRouter.delete('/:id', userController.deleteUserById)
// #swagger.description = 'delete a single User by id'
// #swagger.tags = ['users']

userRouter.delete('/', userController.deleteAllUsers)
// #swagger.description = 'delete all Users'
// #swagger.tags = ['users']

userRouter.use(userController.errorHandler)

module.exports = userRouter
