(function () {
  'use strict';

  angular
    .module('matchings')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('matchings', {
        abstract: true,
        url: '/matchings',
        template: '<ui-view/>'
      })
      .state('matchings.list', {
        url: '',
        templateUrl: 'modules/matchings/client/views/list-matchings.client.view.html',
        controller: 'MatchingsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Matchings List'
        }
      })
      .state('matchings.create', {
        url: '/create',
        templateUrl: 'modules/matchings/client/views/form-matching.client.view.html',
        controller: 'MatchingsController',
        controllerAs: 'vm',
        resolve: {
          matchingResolve: newMatching
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Matchings Create'
        }
      })
      .state('matchings.edit', {
        url: '/:matchingId/edit',
        templateUrl: 'modules/matchings/client/views/form-matching.client.view.html',
        controller: 'MatchingsController',
        controllerAs: 'vm',
        resolve: {
          matchingResolve: getMatching
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Matching {{ matchingResolve.name }}'
        }
      })
      .state('matchings.view', {
        url: '/:matchingId',
        templateUrl: 'modules/matchings/client/views/view-matching.client.view.html',
        controller: 'MatchingsController',
        controllerAs: 'vm',
        resolve: {
          matchingResolve: getMatching
        },
        data: {
          pageTitle: 'Matching {{ matchingResolve.name }}'
        }
      });
  }

  getMatching.$inject = ['$stateParams', 'MatchingsService'];

  function getMatching($stateParams, MatchingsService) {
    return MatchingsService.get({
      matchingId: $stateParams.matchingId
    }).$promise;
  }

  newMatching.$inject = ['MatchingsService'];

  function newMatching(MatchingsService) {
    return new MatchingsService();
  }
}());
