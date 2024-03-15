const routes = require('express').Router()
const userRoutes = require('./user.js')

routes.use('/users', userRoutes)
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: '', // * todo: add documentation URL
    }
    res.send(docData)
  }),
)

module.exports = routes
