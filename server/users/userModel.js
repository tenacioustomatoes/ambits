var Q = require('q');
var mongoose = require('mongoose');
var crypto = require('crypto');

var ambitSchema = new mongoose.Schema({
  refId: {type: Number, index: true}, //a number used to keep track of the ambit
  name: String,
  coords: {
    latitude: Number,
    longitude: Number
  },
  weekdays: [Boolean], //0 is Sunday, 6 is Saturday
  startDate: Date,
  checkIns: [Date] // a history of successful check-ins
  //time (when during the day are you supposed to check in)
  //repeats (every week? every other week? is this necessary?)
});

var transactionSchema = new mongoose.Schema({
  amount: Number,
  ambit: String, 
  previousBalance: Number, 
  currentBalance: Number, 
  Odds: Number 
});

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: String,
  salt: String,
  friend_ids: [String],
  live: [ambitSchema], 
  tokenBalance: Number,
  transactions: [transactionSchema]
});

// var FriendsSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: true
//   }
//   friendAmbitIds: {
//     type: String
//   }
// })

userSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  this.hashPassword(this.password);
  console.log(user);
  return next();

});

userSchema.methods.hashPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha256').toString('hex');
}

userSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha256').toString('hex');
  return this.password === hash;
};

var User = mongoose.model('User', userSchema);
module.exports = User;