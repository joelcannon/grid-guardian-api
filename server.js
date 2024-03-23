const express = require('express')
const cors = require('cors')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const passportConfig = require('../config/passport-config.js'); 

const session = require('express-session')
const app = express()
const { errorHandler } = require('./middlewares/error-handler')

app
  .use(express.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, COntent-Type, Accept, 2-Key, Authorication"
    )
    res.setHeader(
      "Access-COntrol-Allow-Methods", "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    )
    next()
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
  .use(cors({ origin: '*']}))

  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'))
  .use(errorHandler)

  passport.use(new GitHubStrategy({
  ...passportConfig
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id}, function (err, user) {
    //   return done(null, profile)
    // })
  }  
))

passport.serializeUser((user, done) => {
  done(null, user);
});


passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, red) => {res.send(req.session.user !== undefined ? `Logged In as ${req.session.user.displayname}` : "Logged Out")})

app.get('/auth/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

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
