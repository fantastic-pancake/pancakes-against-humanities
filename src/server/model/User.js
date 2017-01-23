var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
  facebook : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        profilePic   : String
    }
});

UserSchema.methods.validatePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isValid) {
    if(err) {
      callback(err)
      return
    }
    callback(null, isValid)
  })
}

var User = mongoose.model('User', UserSchema)
module.exports = User
