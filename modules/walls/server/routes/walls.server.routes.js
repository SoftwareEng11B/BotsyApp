'use strict';

/**
 * Module dependencies
 */
var wallsPolicy = require('../policies/walls.server.policy'),
  walls = require('../controllers/walls.server.controller');

module.exports = function(app) {
  // Walls Routes
  app.route('/api/walls').all(wallsPolicy.isAllowed)
    .get(walls.list)
    .post(walls.create);

  app.route('/api/walls/:wallId').all(wallsPolicy.isAllowed)
    .get(walls.read)
    .put(walls.update)
    .delete(walls.delete);

  // Finish by binding the Wall middleware
  app.param('wallId', walls.wallByID);
};
