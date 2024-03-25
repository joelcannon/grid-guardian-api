// middlewares/validateUser.js
const { userJoiSchema } = require('../models/user-model')

const validateUser = (req, res, next) => {
  const { error } = userJoiSchema.validate(req.body)
  if (error) {
    const err = new Error(error.details[0].message)
    err.statusCode = 400
    return next(err)
  }
  next()
}

module.exports = validateUser
