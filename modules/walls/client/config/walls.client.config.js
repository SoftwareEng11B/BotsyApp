(function () {
  'use strict';

  angular
    .module('walls')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Walls',
      state: 'walls',
      type: 'dropdown',
      roles: ['admin','user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'walls', {
      title: 'List Walls',
      state: 'walls.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'walls', {
      title: 'Create Wall',
      state: 'walls.create',
      roles: ['admin','user']
    });
  }
}());
