'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Arti = mongoose.model('Arti'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Arti
 */
exports.create = function(req, res) {
  var arti = new Arti(req.body);
  arti.user = req.user;

  arti.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(arti);
    }
  });
};

/**
 * Show the current Arti
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var arti = req.arti ? req.arti.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  arti.isCurrentUserOwner = req.user && arti.user && arti.user._id.toString() === req.user._id.toString();

  res.jsonp(arti);
};

/**
 * Update a Arti
 */
exports.update = function(req, res) {
  var arti = req.arti;

  arti = _.extend(arti, req.body);

  arti.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(arti);
    }
  });
};

/**
 * Delete an Arti
 */
exports.delete = function(req, res) {
  var arti = req.arti;

  arti.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(arti);
    }
  });
};

/**
 * List of Artis
 */
exports.list = function(req, res) {
  Arti.find().sort('-created').populate('user', 'displayName').exec(function(err, artis) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(artis);
    }
  });
};

/**
 * Arti middleware
 */
exports.artiByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Arti is invalid'
    });
  }

  Arti.findById(id).populate('user', 'displayName').exec(function (err, arti) {
    if (err) {
      return next(err);
    } else if (!arti) {
      return res.status(404).send({
        message: 'No Arti with that identifier has been found'
      });
    }
    req.arti = arti;
    next();
  });
};
