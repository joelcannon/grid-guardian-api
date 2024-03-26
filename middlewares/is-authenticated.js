const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next()
  } else {
    return res.status(401).json({ message: 'Authentication required' })
    // #swagger.responses[401] = { description: 'Authentication required' }
  }
}

module.exports = {
  isAuthenticated,
}
