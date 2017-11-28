'use strict';

angular.module('users').controller('MuralRequestController', ['$scope', '$state', '$http', '$location', '$window',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {

    $scope.contactform = function(isValid){

      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var data = ({
        contactName : $scope.userForm.firstName.$$rawModelValue,
        contactEmail : $scope.userForm.email.$$rawModelValue,
        contactMsg : $scope.userForm.message.$$rawModelValue
      });

      $http.post('/api/auth/contact-us', data).
        success(function(data, status, headers, config) {
          console.log(1);
          $state.go('customer-homepage');
        }).
        error(function(data, status, headers, config) {
          console.log(0);
        });

    };

  }
]);

angular.module('users').controller('DnDController', ['$scope', '$state', '$http', '$window',
function ($scope, $state, $http, $window) {

  // $window.onload = function(){
  $scope.message('pls work');

  // };

}]);
