(function () {
  'use strict';

  angular
    .module('artis')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('artis', {
        abstract: true,
        url: '/artis',
        template: '<ui-view/>'
      })
      .state('artis.list', {
        url: '',
        templateUrl: 'modules/artis/client/views/list-artis.client.view.html',
        controller: 'ArtisListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Artis List'
        }
      })
      .state('artis.create', {
        url: '/create',
        templateUrl: 'modules/artis/client/views/form-arti.client.view.html',
        controller: 'ArtisController',
        controllerAs: 'vm',
        resolve: {
          artiResolve: newArti
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Artis Create'
        }
      })
      .state('artis.edit', {
        url: '/:artiId/edit',
        templateUrl: 'modules/artis/client/views/form-arti.client.view.html',
        controller: 'ArtisController',
        controllerAs: 'vm',
        resolve: {
          artiResolve: getArti
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Arti {{ artiResolve.name }}'
        }
      })
      .state('artis.view', {
        url: '/:artiId',
        templateUrl: 'modules/artis/client/views/view-arti.client.view.html',
        controller: 'ArtisController',
        controllerAs: 'vm',
        resolve: {
          artiResolve: getArti
        },
        data: {
          pageTitle: 'Arti {{ artiResolve.name }}'
        }
      });
  }

  getArti.$inject = ['$stateParams', 'ArtisService'];

  function getArti($stateParams, ArtisService) {
    return ArtisService.get({
      artiId: $stateParams.artiId
    }).$promise;
  }

  newArti.$inject = ['ArtisService'];

  function newArti(ArtisService) {
    return new ArtisService();
  }
}());
