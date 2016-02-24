var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	email: {type:String,unique:true,required:true},
	password: {type:String,required:true},
	summonername: {type:String,required:true},
	region: {type:String,required:true}
})

UserSchema.pre('save',function(next){
  var user = this;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

module.exports = mongoose.model('User', UserSchema);