(function () {
  'use strict';

  angular
    .module('walls')
    .controller('WallsListController', WallsListController/*, ['$scope', '$state', 'wallsResolve']*/);

  WallsListController.$inject = ['WallsService'];

  function WallsListController(WallsService) {
    var vm = this;

    vm.walls = WallsService.query();
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
