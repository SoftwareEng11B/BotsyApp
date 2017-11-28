'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'WallsService','Authentication', 'userResolve',
  function ($scope, $state,WallsService, Authentication, userResolve) {
    $scope.authentication = Authentication;
    $scope.user = userResolve;

    $scope.remove = function (user) {
      if (confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          $scope.users.splice($scope.users.indexOf(user), 1);
        } else {
          $scope.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };

   /* $scope.getWalls =function(){
      $scope.tempWallList = [];
      console.log(user.wallList[0]);
      for(var i =0; i <user.wallList.length;i++){
        $scope.wall = WallsService.get({wallId:user.wallList[i]});
        $scope.tempWallList.push($scope.wall);
      }

    }*/

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');
        return false;
      }

      var user = $scope.user;

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    $scope.match = function (user) {
      if(user){
        $state.go('admin.match', {
          userId: user._id
        });
      }
    }; 
    $scope.quote = function(user) {
      if(user){
        $state.go('admin.quote', {
          userId: user._id
        });
      }
    };
  }
]);
