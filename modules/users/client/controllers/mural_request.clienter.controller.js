'use strict';

angular.module('users').controller('MuralRequestController', ['$scope', '$state', '$http', '$location', '$window',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

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
          $state.go('home', $state.previous.params);
        }).
        error(function(data, status, headers, config) {
          console.log(0);
        });

    };
  }
]);
