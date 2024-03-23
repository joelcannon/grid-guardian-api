const express = require('express')
const cors = require('cors')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const passportConfig = require('./config/passport-config.js')

const session = require('express-session')
const app = express()
const { errorHandler } = require('./middlewares/error-handler')
const { findUserById } = require('./services/user')

passport.use(
  new GitHubStrategy(
    {
      ...passportConfig,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        { githubId: profile.id },
        {
          username: profile.username,
          displayName: profile.displayName,
          profileUrl: profile.profileUrl,
          // photos: profile.photos
        },
        function (err, user) {
          return done(err, user)
        },
      )
    },
  ),
)

passport.use(
  new GitHubStrategy(
    {
      ...passportConfig,
    },
    function (accessToken, refreshToken, profile, done) {
      // Instead of looking up or creating a user in the database,
      // we're just going to pass the profile directly to done.
      // This will store the profile in the session.
      return done(null, profile)
    },
  ),
)

passport.serializeUser((user, done) => {
  // console.log(user)
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  const user = findUserById(id)
  if (!user) {
    return done(new Error('User not found'))
  }
  done(null, user)
})

app
  .use(express.json())
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
    }),
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(
    cors({ methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'], origin: '*' }),
  )
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'))

app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged In as ${req.session.user.displayname}`
      : 'Logged Out',
  )
})

app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: true,
  }),
  (req, res) => {
    req.session.user = req.user
    res.redirect('/')
  },
)

app.use(errorHandler)

const db = require('./models')
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
