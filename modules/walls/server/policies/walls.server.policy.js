'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Walls Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/walls',
      permissions: '*'
    }, {
      resources: '/api/walls/:wallId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/walls',
      permissions: ['get', 'post']
    }, {
      resources: '/api/walls/:wallId',
      permissions: ['get']
    }]
  }, {
    roles: ['artist'],
    allows: [{
      resources: '/api/walls',
      permissions: ['get']
    }, {
      resources: '/api/walls/:wallId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Walls Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Wall is being processed and the current user created it then allow any manipulation
  if (req.wall && req.user && req.wall.user && req.wall.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
