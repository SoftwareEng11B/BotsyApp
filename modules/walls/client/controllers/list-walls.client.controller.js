(function () {
  'use strict';

  angular
    .module('walls')
    .controller('WallsListController', WallsListController/*, ['$scope', '$state', 'wallsResolve']*/);

  WallsListController.$inject = ['WallsService', 'Users'];

  function WallsListController(WallsService, Users) {
    var vm = this;

    vm.walls = WallsService.query();
    vm.users = Users.query();
  }
  /*function($scope, $state, wallsResolve){
  	$scope.walls = wallsResolve;

  	$scope.match = function(walls) {
  		if(walls){
  			$state.go('match', {
  				wallId: walls._id
  			});
  		}
  	};
  }
  Breaks the table, items won't display
  */
  
}());
