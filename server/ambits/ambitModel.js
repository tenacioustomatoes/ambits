var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
  avatar: String,
  name: String, 
  text: String
});

var betSchema = new Schema({
  username: String,
  betAmount: Number
});

var ambitSchema = new Schema({
  refId: {type: Number, index: true}, //a number used to keep track of the ambit
  owner: String, 
  name: String,
  coords: {
    latitude: Number,
    longitude: Number
  },
  weekdays: [Boolean], //0 is Sunday, 6 is Saturday
  startDate: Date,
  checkIns: [Date], // a history of successful check-ins//time (when during the day are you supposed to check in)
  messages: [messageSchema],
  bettingOdds: Number,
  bets: [betSchema]
});

var Ambit = mongoose.model('Ambit', ambitSchema);

module.exports = Ambit;
