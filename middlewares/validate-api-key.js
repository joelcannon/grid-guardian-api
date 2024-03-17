require('dotenv').config()

const apiKey = process.env.API_KEY

const validateApiKey = (req, res, next) => {
  if (req.header('apiKey') !== apiKey) {
    console.log('no apiKey match', req.header('apiKey'), apiKey)
    const error = new Error('Invalid apiKey, please read the documentation.')
    error.statusCode = 401
    return next(error)
  }
  next()
}

module.exports = validateApiKey
