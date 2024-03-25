const passport = require('passport')

exports.login = (req, res, next) => {
  // #swagger.responses[200] = { description: 'Redirects to GitHub for authentication' }
  passport.authenticate('github', (err) => {
    if (err) {
      console.error('Error during login:', err)
      return next(err)
    }
  })(req, res, next)
}

exports.logout = (req, res, next) => {
  // #swagger.responses[200] = { description: 'Logs out the user and redirects to the homepage' }
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
}

exports.githubCallback = (req, res, next) => {
  passport.authenticate(
    'github',
    {
      failureRedirect: '/api-docs',
      session: true,
    },
    (err, user, info) => {
      if (err) {
        console.log('Authentication error:', err)
        return next(err)
      }
      if (!user) {
        console.log('Authentication failed:', info)
        return res.redirect('/api-docs')
      }
      req.logIn(user, (err) => {
        if (err) {
          console.log('Error logging in:', err)
          return next(err)
        }
        req.session.user = user
        res.redirect('/')
      })
    },
  )(req, res, next)
}
