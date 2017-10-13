// Artis service used to communicate Artis REST endpoints
(function () {
  'use strict';

  angular
    .module('artis')
    .factory('ArtisService', ArtisService);

  ArtisService.$inject = ['$resource'];

  function ArtisService($resource) {
    return $resource('api/artis/:artiId', {
      artiId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
