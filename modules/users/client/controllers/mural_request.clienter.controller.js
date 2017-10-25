'use strict';

angular.module('users').controller('MuralRequestController', ['$scope', '$state', '$http', '$location', '$window',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;
  }
]);
