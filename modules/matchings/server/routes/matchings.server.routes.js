'use strict';

/**
 * Module dependencies
 */
var matchingsPolicy = require('../policies/matchings.server.policy'),
  matchings = require('../controllers/matchings.server.controller');

module.exports = function(app) {
  // Matchings Routes
  app.route('/api/matchings').all(matchingsPolicy.isAllowed)
    .get(matchings.list)
    .post(matchings.create);

  app.route('/api/matchings/:matchingId').all(matchingsPolicy.isAllowed)
    .get(matchings.read)
    .put(matchings.update)
    .delete(matchings.delete);

  // Finish by binding the Matching middleware
  app.param('matchingId', matchings.matchingByID);
};
