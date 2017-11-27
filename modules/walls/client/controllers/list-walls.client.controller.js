(function () {
  'use strict';

  angular
    .module('walls')
    .controller('WallsListController', WallsListController);

  WallsListController.$inject = ['WallsService', 'Users'];

  function WallsListController(WallsService, Users) {

    var vm = this;

    vm.walls = WallsService.query();
    vm.users = Users.query();
  }
}());
