const { User } = require('../models/user-model')

function findUserById(id) {
  console.log('findUserById', id)
  // console.log('User', User)
  return User.findById(id)
}

async function createUser(userData) {
  const user = new User(userData)
  return await user.save()
}

module.exports = {
  findUserById,
  createUser,
}
