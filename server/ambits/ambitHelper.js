var Ambit = require('./ambitModel.js');
var q = require('q');
// var Live = require('./liveModel.js');

//Promisify some of the mongoose CRUD methods
var findAmbit = q.nbind(Ambit.findOne, Ambit);
var findAllAmbits = q.nbind(Ambit.find, Ambit);
var createAmbit = q.nbind(Ambit.create, Ambit);
var updateAmbit = q.nbind(Ambit.findByIdAndUpdate);

// var createLiveStream = q.nbind(Live.create, Live);
// var deleteLiveStream = q.nbind(Live.remove, Live);

module.exports.addAmbit = function (req, res, next) {
  //records a new ambit from the user
  var ambit = req.body.ambit;
  ambit.checkIns = [];
  ambit.refId = Math.round(Math.random()*10000);

  findAmbit({refId: ambit.refId}) //should check per user as well
    .then(function(found){
      if (found) {
        return next(new Error('Ambit refId already exists'));
      } else{
        return createAmbit(ambit);
      }
    })
    .then(function (createdAmbit) {
      if (createdAmbit) {
        res.json(createdAmbit);
      }
    })
    .fail(function (error) {
      next(error);
    });
};

module.exports.addComment = function(req, res, next) {
  var _id = req.params.id,
      body = req.body;

  updateAmbit(_id, {$push: body}, {new: true})
    .then(function(savedAmbit) {
      res.send(savedAmbit);
    });
};

module.exports.saveCheckIn = function(req, res, next) {
  //add the current date to the ambits checkIn property
  //TODO: check for a preexisting check-in for this date first

  var refId = req.params.id;

  findAmbit({refId: refId})
    .then(function(ambit) {
      var now = new Date;
      var today = now.toDateString();
      var lastCheck = ambit.checkIns[ambit.checkIns.length -1].toDateString();
      if (today !== lastCheck){
        ambit.checkIns.push( now );
        return ambit.save();
      } else {
        res.json('already checked in');
      }
    })
    .then(function(savedAmbit) {
      res.send(savedAmbit);
    });
};

module.exports.getAmbits = function(req, res, next) {
  //send an array containing all the ambits back to the user.

  findAllAmbits()
    .then(function(ambits){
      res.send(ambits);
    })
    .fail(function (error) {
      next(error);
    });
};

// module.exports.addLiveStream = function(req, res, next) {
//   var peerId = req.body.peerId;
//   var user = req.body.user;
//   var ambitId = req.body.ambitId;
//   createLiveStream({
//     user: user,
//     ambitId: ambitId,
//     peerId: peerId
//   })
//   .then(function(addedLive) {
//     console.log('Stream saved:', peerId);
//     res.send(addedLive);
//   })
//   .fail(function(error) {
//     console.error('Error saving live stream to DB', error);
//   });
// };

// // module.exports.removeLiveStream = function(req, res, next) {
// //   var peerId = req.body.peerId;
// //   console.log(peerId);
// //   deleteLiveStream({peerId: peerId})
// //   .then(function(deletedLive) {
// //     console.log('Stream deleted:', peerId);
// //     res.send(deletedLive);
// //   })
// //   .fail(function(error) {
// //     console.error('Error deleting live stream from DB', error);
// //   });
// // };
