const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {User} = require('../models');

module.exports.passport = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET;

  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    if (typeof jwt_payload.email === 'undefined' || jwt_payload.email === null) {
      return done(null, false);
    }

    User.findOne({where: {email: jwt_payload.email}})
      .then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch((error) => {
        return done(error, false);
      });
  }));
};

module.exports.requireJWT = function (passport) {
  return passport.authenticate('jwt', {session: false, failWithError: true});
};
