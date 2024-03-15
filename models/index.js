const dbConfig = require('../config/db.config.js')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.User = require('./user.js')(mongoose)
db.Organization = require('./organization.js')(mongoose)

module.exports = db
