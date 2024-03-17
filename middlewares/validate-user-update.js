// middlewares/validateUserUpdate.js
const Joi = require('joi')
const { userJoiSchema } = require('../models/user')

const userUpdateJoiSchema = Joi.object({
  username: userJoiSchema.extract('username').optional(),
  email: userJoiSchema.extract('email').optional(),
  password: userJoiSchema.extract('password').optional(),
  phone: userJoiSchema.extract('phone').optional(),
  firstName: userJoiSchema.extract('firstName').optional(),
  lastName: userJoiSchema.extract('lastName').optional(),
  role: userJoiSchema.extract('role').optional(),
  organization: userJoiSchema.extract('organization').optional(),
})

const validateUserUpdate = (req, res, next) => {
  const { error } = userUpdateJoiSchema.validate(req.body)
  if (error) {
    const err = new Error(error.details[0].message)
    err.statusCode = 400
    return next(err)
  }
  next()
}

module.exports = validateUserUpdate
