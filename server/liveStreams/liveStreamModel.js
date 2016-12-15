var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ambitSchema = require('../ambits/ambitModel')

var liveSchema = new Schema({
  uId: String,
  ambitId: String
});

var LiveStreams = mongoose.model('LiveStreams', liveSchema);
module.exports = LiveStreams;	