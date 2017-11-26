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
    vm.progress = 0;





    vm.upload = function (dataUrl) {
      
            Upload.upload({
              url: '/api/users/picture',
              data: {
                newProfilePicture: dataUrl
              }
            }).then(function (response) {
              $timeout(function () {
                onSuccessItem(response.data);
              });
            }, function (response) {
              if (response.status > 0) onErrorItem(response.data);
            }, function (evt) {
              vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
            });
          };
      
          
    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(response) {
      // Show success message
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Successfully changed Wall picture' });

      // Populate user object
      vm.user = Authentication.user = response;

      // Reset form
      vm.fileSelected = false;
      vm.progress = 0;
    }

    // Called after the user has failed to upload a new picture
    function onErrorItem(response) {
      vm.fileSelected = false;
      vm.progress = 0;

      // Show error message
      Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> Failed to change Wall picture' });
    }





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
