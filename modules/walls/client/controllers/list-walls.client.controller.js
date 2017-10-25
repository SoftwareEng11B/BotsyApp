(function () {
  'use strict';

  angular
    .module('walls')
    .controller('WallsListController', WallsListController);

  WallsListController.$inject = ['WallsService'];

  function WallsListController(WallsService) {
    var vm = this;

    vm.walls = WallsService.query();
  }
}());
