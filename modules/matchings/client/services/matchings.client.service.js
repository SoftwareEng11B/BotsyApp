// Matchings service used to communicate Matchings REST endpoints
(function () {
  'use strict';

  angular
    .module('matchings')
    .factory('MatchingsService', MatchingsService);

  MatchingsService.$inject = ['$resource'];

  function MatchingsService($resource) {
    return $resource('api/matchings/:matchingId', {
      matchingId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
