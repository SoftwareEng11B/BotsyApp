(function () {
  'use strict';

  // Matchings controller
  angular
    .module('matchings')
    .controller('MatchingsController', MatchingsController);

  MatchingsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'matchingResolve'];

  function MatchingsController ($scope, $state, $window, Authentication, matching) {
    var vm = this;

    vm.authentication = Authentication;
    vm.matching = matching;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Matching
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.matching.$remove($state.go('matchings.list'));
      }
    }

    // Save Matching
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.matchingForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.matching._id) {
        vm.matching.$update(successCallback, errorCallback);
      } else {
        vm.matching.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('matchings.view', {
          matchingId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
