const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  clientID: process.env.GITHUB_CLIENT_ID,
  callbackURL: process.env.CALLBACK_URL,
}
