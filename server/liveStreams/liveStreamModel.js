var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ambitSchema = require('../ambits/ambitModel')

var liveSchema = new Schema({
  liveAmbits: [ambitSchema]
});

var LiveStreams = mongoose.model('LiveStreams', liveSchema);
module.exports = LiveStreams;	