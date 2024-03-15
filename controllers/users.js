require('dotenv').config()
const db = require('../models')
const User = db.User

const apiKey = process.env.API_KEY

const validateApiKey = (req, res, next) => {
  if (req.header('apiKey') !== apiKey) {
    return res
      .status(401)
      .json({ message: 'Invalid apiKey, please read the documentation.' })
  }
  next()
}

exports.createUser = [
  validateApiKey,
  (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({ message: 'Content can not be empty!' })
    }

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      organization: req.body.organization,
    })

    user
      .save(user)
      .then((data) => {
        res.json(data)
      })
      .catch(next)
  },
]

// exports.getAllUsers = [
//   validateApiKey,
//   (req, res, next) => {
//     User.find(
//       {},
//       {
//         name: 1,
//         location: 1,
//         dedicated: 1,
//         additionalInfo: 1,
//         _id: 0,
//       }
//     )
//       .then((data) => {
//         res.json(data);
//       })
//       .catch(next);
//   },
// ];

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((data) => {
      res.json(data)
    })
    .catch(next)
}

exports.getUserById = [
  validateApiKey,
  (req, res, next) => {
    const id = req.params.id

    User.find({ id: id })
      .then((data) => {
        if (!data)
          return res
            .status(404)
            .json({ message: 'Not found User with id ' + id })
        res.json(data[0])
      })
      .catch(next)
  },
]

// Error handling middleware
exports.errorHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message || 'Some error occurred.',
  })
}

// Update a User by the id in the request
exports.updateUserById = [
  validateApiKey,
  (req, res, next) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: 'Data to update can not be empty!' })
    }

    const id = req.params.id

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            message: `Cannot update User with id=${id}. Maybe User was not found!`,
          })
        } else res.json({ message: 'User was updated successfully.' })
      })
      .catch(next)
  },
]

// Delete a User with the specified id in the request
exports.deleteUserById = [
  validateApiKey,
  (req, res, next) => {
    const id = req.params.id

    User.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`,
          })
        } else {
          res.json({ message: 'User was deleted successfully!' })
        }
      })
      .catch(next)
  },
]

// Delete all Users from the database.
exports.deleteAllUsers = [
  validateApiKey,
  (req, res, next) => {
    User.deleteMany({})
      .then((data) => {
        res.json({
          message: `${data.deletedCount} Users were deleted successfully!`,
        })
      })
      .catch(next)
  },
]
