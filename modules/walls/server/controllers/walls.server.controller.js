'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Wall = mongoose.model('Wall'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Wall
 */
exports.create = function(req, res) {
  var wall = new Wall(req.body);
  wall.user = req.user;
  wall.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(wall);
    }
  });
};

/**
 * Show the current Wall
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var wall = req.wall ? req.wall.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  wall.isCurrentUserOwner = req.user && wall.user && wall.user._id.toString() === req.user._id.toString();

  res.jsonp(wall);
};

/**
 * Update a Wall
 */
exports.update = function(req, res) {
  var wall = req.wall;
  wall = _.extend(wall, req.body);
  wall.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(wall);
    }
  });
};

/**
 * Delete an Wall
 */
exports.delete = function(req, res) {
  var wall = req.wall;
  wall.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(wall);
    }
  });
};

/**
 * List of Walls Made by that user
 */
exports.list = function(req, res) {
  if(req.user.roles[0] === 'user'){
    Wall.find({ 'user':req.user.id }).sort('-created').populate('user', 'displayName').exec(function(err, walls) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(walls);
      }
    });
  }else if(req.user.roles[0] === 'artist'){Wall.find({ 'Artist':req.user.id }).sort('-created').populate('user', 'displayName').exec(function(err, walls) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(walls);
    }
  });
  } else if(req.user.roles[0] === 'admin'){
    Wall.find().sort('-created').populate('user', 'displayName').exec(function(err, walls) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.jsonp(walls);
      }
    });
  }
};


/**
 * Wall middleware
 */
exports.wallByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Wall is invalid'
    });
  }

  Wall.findById(id).populate('user').exec(function (err, wall) {
    if (err) {
      return next(err);
    } else if (!wall) {
      return res.status(404).send({
        message: 'No Wall with that identifier has been found'
      });
    }
    req.wall = wall;
    next();
  });
};
