// Walls service used to communicate Walls REST endpoints
(function () {
  'use strict';

  angular
    .module('walls')
    .factory('WallsService', WallsService);

  WallsService.$inject = ['$resource'];

  function WallsService($resource) {
    return $resource('api/walls/:wallId', {
      wallId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
