var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var GameSchema = new mongoose.Schema({
  questions: {
    type: Array,
    required: true
  },
  answers: {
    type: Array,
    required: true
  }
})

var Game = mongoose.model('Game', GameSchema)
module.exports = Game
