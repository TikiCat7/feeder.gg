var Jwtstrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('./model');
var config = require('./config');
var passport = require('passport');

require('./passport')(passport);

//setting up passport strategy
module.exports = function(passport) {
  var opts = {};
  //set jwtFromRequest value equal to the jwt from the AuthHeader in the request
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  //set secret to what is in config.secret to decode the sent jwt
  opts.secretOrKey = config.secret;


  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({email: jwt_payload.email}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};