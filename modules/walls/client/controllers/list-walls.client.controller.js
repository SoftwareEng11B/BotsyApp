(function () {
  'use strict';

  angular
    .module('walls')
    .controller('WallsListController', WallsListController/*, ['$scope', '$state', 'wallsResolve']*/);

  WallsListController.$inject = ['WallsService', 'Users'];

  function WallsListController(WallsService, Users) {
    var vm = this;

    vm.walls = WallsService.query();
    vm.users = Users.query();// to get users in the wall controller
  }
  
  
}());
