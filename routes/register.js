var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('../model');
var config = require('../config');
mongoose.connect(config.database);


//get register page
router.get('/', function(req,res, next){
	res.render('register');
});

router.post('/newRegister', function(req,res,next){
	console.log("new registration recieved");
	//console.log(req.body);

	//check if email is already registered
	//if it is return an error
	//otherwise add a new user into the db

	var user = new userModel({
		email: req.body.email,
		password: req.body.password,
		summonername: req.body.summonername,
		region: req.body.region
	});

	console.log(user);

	userModel.findOne({email:user.email},function(err,docs){
		if (err) throw err;
		if (docs){
			return res.json({success:false, message: 'That email address already exists.'});
		} else {
			user.save(function(err){
				if(err) {
					return res.json({ success: false, message: 'That email address already exists.'});
				}
			console.log('User saved successfully');
			res.json({success: true, message: 'New User Added Successfully'});
			});
		}
	});
});

module.exports = router;