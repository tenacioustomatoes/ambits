var Ambit = require('./ambitModel.js');
var q = require('q');
var User = require('../users/userModel.js');
// var Live = require('./liveModel.js');

//Promisify some of the mongoose CRUD methods
var findAmbit = q.nbind(Ambit.findOne, Ambit);
var findUserAmbits = q.nbind(Ambit.find, Ambit);
var findAllAmbits = q.nbind(Ambit.find, Ambit);
var createAmbit = q.nbind(Ambit.create, Ambit);
var updateAmbit = q.nbind(Ambit.findByIdAndUpdate, Ambit);
var updateBetAmbit = q.nbind(Ambit.findOneAndUpdate, Ambit);
var updateUserAmbit = q.nbind(User.findOneAndUpdate, User);
var findUser = q.nbind(User.findOne, User);
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


  updateAmbit(_id, {$push: {'messages': body.message}}, {new: true})
    .then(function(savedAmbit) {
      console.log(savedAmbit);
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


module.exports.getUserAmbits = function(req, res, next) {
  //send an array containing all the ambits back to the user.
  var user = req.params.id;

  findUserAmbits({user: user})
    .then(function(ambits){
      res.send(ambits);
    })
    .fail(function (error) {
      next(error);
    });
};

module.exports.placeBet = function(req, res, next) {
  var bet = req.body.bet;
  console.log('body is', req.body);
  var refId = req.body.ambitRefId;

  updateBetAmbit({'refId': refId}, {$push: {'bets': bet}}, {new: true})
    .then(function(savedAmbit) {
      console.log(savedAmbit);
      res.send(savedAmbit);
    })
    .catch(function(error) {
      console.error('Error saving bet', error);
    });
};

module.exports.collectWinnings = function(req, res, next) {
  var refId = req.body.ambitRefId;
  console.log(refId);
  var username = req.body.username;
  findAmbit({'refId': refId}, 'bets')
  .then(result => {
    console.log(result);
    var winnings = result.bets.reduce((accum, prev) => accum.betAmount + prev.betAmount);
    console.log(winnings);
    updateUserAmbit({'username': username}, {'tokenBalance': winnings + 1000}, {new: true})
    .then(() => res.send('Updated user balance'))
    .catch(() => console.error('Error updating user balace'));
  })
  .catch(() => console.error('Error collecting winnings'));
};

module.exports.getBalance = function(req, res, next) {
  var username = req.params.username;
  console.log(username);
  findUser({'username': username}, 'tokenBalance')
  .then(result => {
    console.log('Sent balance back to client', result);
    res.send(result);
  })
  .catch(err => {
    console.error('Error sending balance back to client');
  });
}