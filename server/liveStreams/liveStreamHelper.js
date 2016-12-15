var q = require('q');
var Live = require('./liveModel.js');

var createLiveStream = q.nbind(Live.create, Live);
var findOneLiveStream = q.nbind(Live.findOne, Live);
var findAllLiveStream = q.nbind(Live.find, Live);

module.exports.addLiveStream = function(req, res, next) {
  var peerId = req.body.peerId;
  var user = req.body.user;
  var ambitId = req.body.ambitId;
  createLiveStream({
    user: user,
    ambitId: ambitId,
    peerId: peerId
  })
  .then(function(addedLive) {
    console.log('Stream saved:', peerId);
    res.send(addedLive);
  })
  .fail(function(error) {
    console.error('Error saving live stream to DB', error);
  });
};

module.exports.removeLiveStream = function(req, res, next) {
  var peerId = req.body.peerId;
  findOneLiveStream({peerId: peerId})
  .then(function(deletedLive) {
    console.log('Stream deleted:', peerId);
    deletedLive.remove();
    res.send(deletedLive);
  })
  .fail(function(error) {
    console.error('Error deleting live stream from DB', error);
  });
};

module.exports.retrieveAllLiveStreams = function(req, res, next) {
  findAllLiveStream({})
  .then(function(streams) {
    console.log('Streams retrieved');
    res.send(streams);
  })
  .fail(function(error) {
    console.error('Error retrieving all live streams from DB', error);
  });
}