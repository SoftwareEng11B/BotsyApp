(function () {
  'use strict';

  angular
    .module('walls')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('walls', {
        abstract: true,
        url: '/walls',
        template: '<ui-view/>'
      })
      .state('walls.list', {
        url: '',
        templateUrl: 'modules/walls/client/views/list-walls.client.view.html',
        controller: 'WallsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Walls List'
        }
      })
      .state('walls.create', {
        url: '/create',
        templateUrl: 'modules/walls/client/views/form-wall.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve: {
          wallResolve: newWall
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Walls Create'
        }
      })
      .state('walls.edit', {
        url: '/:wallId/edit',
        templateUrl: 'modules/walls/client/views/form-wall.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve: {
          wallResolve: getWall
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Wall {{ wallResolve.name }}'
        }
      })
      .state('walls.view', {
        url: '/:wallId',
        templateUrl: 'modules/walls/client/views/view-wall.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve: {
          wallResolve: getWall
        },
        data: {
          pageTitle: 'Wall {{ wallResolve.name }}'
        }
      })
      .state('walls.quote', {
        url: '/:wallId/quote',
        templateUrl: 'modules/walls/client/views/quote-wall.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve: {
          wallResolve: getWall
        },
        data: {
          pageTitle: 'Wall quote'
        }
      })

      .state('walls.match', {
        url:'/:wallId/match',
        templateUrl: 'modules/walls/client/views/match-wall.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve: {
          wallResolve: getWall
        },
        data: {
          pageTitle: 'Quote Project'
        }
      })
      ;
/*
      .state('walls.match',{
        url:'/walls/:wallId/match',
        templateUrl: '/modules/walls/client/views/quote-wall.client.view.html',
        controller: 'WallsController',
        controllerAs: 'vm',
        resolve:{
          wallResolve: ['$stateParams', function($stateParams){
            return get({wallId: $stateParams.wallId});
          }]
        }
      });
Breaks entire wall section of menu, controller won't route properly
*/
  }

  getWall.$inject = ['$stateParams', 'WallsService'];

  function getWall($stateParams, WallsService) {
    return WallsService.get({
      wallId: $stateParams.wallId
    }).$promise;
  }

  newWall.$inject = ['WallsService'];

  function newWall(WallsService) {
    return new WallsService();
  }

  function getUserIds($stateParams, WallsService){
    return WallService.get({
      userId: $stateParams.wallId
    })
  }
}());
