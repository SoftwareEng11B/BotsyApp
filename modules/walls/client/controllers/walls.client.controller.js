(function () {
  'use strict';

  // Walls controller
  angular
    .module('walls')
    .controller('WallsController', WallsController);

  WallsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'wallResolve'];

  function WallsController ($scope, $state, $window, Authentication, wall) {
    var vm = this;

    vm.authentication = Authentication;
    vm.wall = wall;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Wall
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.wall.$remove($state.go('walls.list'));
      }
    }

    // Save Wall
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.wallForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.wall._id) {
        vm.wall.$update(successCallback, errorCallback);
      } else {
        vm.wall.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('walls.view', {
          wallId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
