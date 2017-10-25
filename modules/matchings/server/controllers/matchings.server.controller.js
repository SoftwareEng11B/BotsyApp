'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Matching = mongoose.model('Matching'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Matching
 */
exports.create = function(req, res) {
  var matching = new Matching(req.body);
  matching.user = req.user;

  matching.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(matching);
    }
  });
};

/**
 * Show the current Matching
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var matching = req.matching ? req.matching.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  matching.isCurrentUserOwner = req.user && matching.user && matching.user._id.toString() === req.user._id.toString();

  res.jsonp(matching);
};

/**
 * Update a Matching
 */
exports.update = function(req, res) {
  var matching = req.matching;

  matching = _.extend(matching, req.body);

  matching.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(matching);
    }
  });
};

/**
 * Delete an Matching
 */
exports.delete = function(req, res) {
  var matching = req.matching;

  matching.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(matching);
    }
  });
};

/**
 * List of Matchings
 */
exports.list = function(req, res) {
  Matching.find().sort('-created').populate('user', 'displayName').exec(function(err, matchings) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(matchings);
    }
  });
};

/**
 * Matching middleware
 */
exports.matchingByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Matching is invalid'
    });
  }

  Matching.findById(id).populate('user', 'displayName').exec(function (err, matching) {
    if (err) {
      return next(err);
    } else if (!matching) {
      return res.status(404).send({
        message: 'No Matching with that identifier has been found'
      });
    }
    req.matching = matching;
    next();
  });
};
