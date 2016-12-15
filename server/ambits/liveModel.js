var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var liveSchema = new Schema({
  uId: String,
  ambitId: String,
  user: String,
  peerId: String
});

var Live = mongoose.model('Live', liveSchema);

module.exports = Live;