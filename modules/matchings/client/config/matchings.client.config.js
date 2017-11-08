(function () {
  'use strict';

  angular
    .module('matchings')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Matchings',
      state: 'matchings',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'matchings', {
      title: 'List Matchings',
      state: 'matchings.list'
    });

    // Add the dropdown create item
  /*  menuService.addSubMenuItem('topbar', 'matchings', {
      title: 'Create Matching',
      state: 'matchings.create',
      roles: ['admin']
    });*/
  }
}());
