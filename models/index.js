const dbConfig = require('../config/db.config.js')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.User = require('./user.js')
db.Organization = require('./organization.js')(mongoose) // #todo: update to be the same as User.

module.exports = db
