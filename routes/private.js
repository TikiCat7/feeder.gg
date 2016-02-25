//private api endpoint that requires authentication via jwt token
var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config');
var router = express.Router();

//get something private 
router.get('/', passport.authenticate('jwt', { session: false }), function(req,res,next){

  //get token out of request cookie
  var token = req.cookies.jwt;
  res.json({'success':true,'message':'access to private api successful!','cookie':req.cookies})
});

router.get('/test',function(req,res,next){
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	console.log(token);
});

module.exports = router;

