var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

// var UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// })

var UserSchema = new mongoose.Schema({
  facebook : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
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