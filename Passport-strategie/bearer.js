const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin')
const passport = require('passport');
const LocalStrategy = require('passport-http-bearer').Strategy

passport.use(new LocalStrategy(
  async function (token, done) {
    const decoded = jwt.verify(token, 'secret')

    const response = await Admin.findById(decoded.UserId)

    if (!response) { return done(null, false); }
    return done(null, response);
  }
));