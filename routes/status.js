const express = require('express')
const router = express.Router()

router.get(
  '/',
  // #swagger.summary = 'report login status'
  // #swagger.tags = ['status']
  (req, res) => {
    res.send(
      req.session.user !== undefined
        ? `Logged In as ${req.session.user.displayName}`
        : 'Logged Out',
    )
  },
)

module.exports = router
