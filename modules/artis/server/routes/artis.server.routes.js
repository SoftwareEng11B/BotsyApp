'use strict';

/**
 * Module dependencies
 */
var artisPolicy = require('../policies/artis.server.policy'),
  artis = require('../controllers/artis.server.controller');

module.exports = function(app) {
  // Artis Routes
  app.route('/api/artis').all(artisPolicy.isAllowed)
    .get(artis.list)
    .post(artis.create);

  app.route('/api/artis/:artiId').all(artisPolicy.isAllowed)
    .get(artis.read)
    .put(artis.update)
    .delete(artis.delete);

  // Finish by binding the Arti middleware
  app.param('artiId', artis.artiByID);
};
