require('dotenv').config()
const { User } = require('../models/user')
const validateApiKey = require('../middlewares/validate-api-key')
const validateUser = require('../middlewares/validate-user')
const validateUserUpdate = require('../middlewares/validate-user-update')

const apiKey = process.env.API_KEY

exports.createUser = [
  validateApiKey,
  validateUser,
  async (req, res, next) => {
    // #swagger.requestBody = {
    //   required: true,
    //   content: {
    //     "application/json": {
    //       schema: {
    //         $ref: '#/components/schemas/User'
    //       }
    //     }
    //   }
    // }
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[400] = { description: 'Bad request: Content can not be empty!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    if (!req.body.username) {
      return res.status(400).json({ message: 'Content can not be empty!' })
    }

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      phone: req.body.phone,
      isActive: req.body.isActive,
      organization: req.body.organization,
    })

    try {
      const data = await user.save(user)
      res.json(data)
    } catch (err) {
      next(err)
    }
  },
]

exports.getAllUsers = [
  validateApiKey,
  async (req, res, next) => {
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await User.find()
      res.json(data)
    } catch (err) {
      next(err)
    }
  },
]

exports.getUserById = [
  validateApiKey,
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'User ID' }
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[404] = { description: 'Not found: User with id' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id

    try {
      const data = await User.findOne({ _id: id })

      if (!data) {
        return res.status(404).json({ message: 'Not found User with id ' + id })
      }

      res.json(data)
    } catch (err) {
      next(err)
    }
  },
]

exports.updateUserById = [
  validateApiKey,
  validateUserUpdate,
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'User ID' }
    // #swagger.requestBody = {
    //   required: true,
    //   content: {
    //     "application/json": {
    //       schema: {
    //         $ref: '#/components/schemas/User'
    //       }
    //     }
    //   }
    // }
    // #swagger.responses[200] = {
    //   description: 'Success: User was updated successfully.',
    //   schema: { $ref: '#/components/schemas/User' }
    // }
    // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot update User with id. Maybe User was not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    if (!req.body) {
      return res
        .status(400)
        .json({ message: 'Data to update can not be empty!' })
    }

    const id = req.params.id

    try {
      const data = await User.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
        new: true,
      })

      if (!data) {
        return res.status(404).json({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        })
      } else {
        res
          .status(200)
          .json({ message: 'User was updated successfully.', user: data })
      }
    } catch (err) {
      next(err)
    }
  },
]

exports.deleteUserById = [
  validateApiKey,
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'User ID' }
    // #swagger.responses[204] = { description: 'Success: User was deleted successfully!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot delete User with id. Maybe User was not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id

    try {
      const data = await User.findByIdAndRemove(id)

      if (!data) {
        return res.status(404).json({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        })
      } else {
        res.status(204).json({ message: 'User was deleted successfully!' })
      }
    } catch (err) {
      next(err)
    }
  },
]

exports.deleteAllUsers = [
  validateApiKey,
  async (req, res, next) => {
    // #swagger.responses[204] = { description: 'Success: Users were deleted successfully!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await User.deleteMany({})
      res.status(204).json({
        message: `${data.deletedCount} Users were deleted successfully!`,
      })
    } catch (err) {
      next(err)
    }
  },
]

exports.toggleUserActiveStatus = [
  validateApiKey,
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'User ID' }
    // #swagger.responses[200] = {
    //   description: 'Success: User active status was toggled successfully.',
    //   schema: { $ref: '#/components/schemas/User' }
    // }
    // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot toggle User active status with id. Maybe User was not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }

    if (!req.body) {
      return res
        .status(400)
        .json({ message: 'Data to update can not be empty!' })
    }

    const id = req.params.id

    try {
      const user = await User.findById(id)
      if (!user) {
        return res.status(404).json({
          message: `Cannot toggle User active status with id=${id}. Maybe User was not found!`,
        })
      } else {
        user.isActive = !user.isActive
        const data = await user.save()
        res.status(200).json({
          message: `User active status was toggled successfully. Current status is ${user.isActive ? 'active' : 'inactive'}.`,
          user: data,
        })
      }
    } catch (err) {
      next(err)
    }
  },
]
