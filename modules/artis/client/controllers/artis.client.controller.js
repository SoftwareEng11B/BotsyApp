(function () {
  'use strict';

  // Artis controller
  angular
    .module('artis')
    .controller('ArtisController', ArtisController);

  ArtisController.$inject = ['$scope', '$state', '$window', 'Authentication', 'artiResolve'];

  function ArtisController ($scope, $state, $window, Authentication, arti) {
    var vm = this;

    vm.authentication = Authentication;
    vm.arti = arti;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Arti
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.arti.$remove($state.go('artis.list'));
      }
    }

    // Save Arti
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.artiForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.arti._id) {
        vm.arti.$update(successCallback, errorCallback);
      } else {
        vm.arti.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('artis.view', {
          artiId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
