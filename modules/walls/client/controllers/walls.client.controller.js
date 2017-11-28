(function () {
  'use strict';

  // Walls controller
  angular
    .module('walls')
    .controller('WallsController', WallsController, ['$scope', '$filter','$http']);

  WallsController.$inject = ['$scope', '$state', '$window','$http', 'Users','Authentication', 'wallResolve'];

  function WallsController ($scope, $state, $window, $http, Users,Authentication, wall) {
    var vm = this;

    vm.authentication = Authentication;
    vm.wall = wall;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.user1 = Authentication.user;
    vm.update = update;
    vm.userList = Users.query();




    vm.saveStatus =function(){
      vm.wall.$update();
    };

    vm.saveHasQuote = function (){
      vm.wall.status.hasQuote = true;
      var wallToUpdate = vm.wall;
      wallToUpdate.$update();

    };

    vm.email = function(){
      console.log(5);

      var data = ({
        contactName : vm.wall.user.displayName,
        contactEmail : vm.wall.user.email,
        contactMsg : "Length: " + vm.wall.wall_info.length +"Width" + vm.wall.wall_info.width +
        "Type of Location:" + vm.wall.wall_info.loc_type +
        "Material:"+ vm.wall.wall_info.material +
        "Finish:" +vm.wall.wall_info.finish +
        "Paint Name:" +vm.wall.wall_info.paint_name +
        "Required Preparation:" +vm.wall.wall_info.prep_req+
        "Required Paint:" +vm.wall.wall_info.paint_req +
        "Recoloring:"+ vm.wall.wall_info.recolor +
        "Type of Wall:"+vm.wall.Wall_type
      });

      $http.post('/api/auth/contact-us', data).
        success(function(data, status, headers, config) {
          $state.go('home', $state.previous.params);
        }).
        error(function(data, status, headers, config) {
        });
    };

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

      function matche(){
        vm.wall.Artist;
      }
      function Quote(){}
      function completed(){}
      function paid(){}

      function successCallback(res) {
       /* var user = new Users(vm.user1);

       comment: ""

      Wall_Imges: Object

        if (user.wallList.length>0){
          user.wallList = [res._id];
          vm.wall.$save();
          console.log("save");
        }
        if (user.wallList.length>0) {
          user.wallList.push(res._id);
          user.$update();
          console.log("update");
        }
        vm.user1 = user;*/

        $state.go('walls.view', {
          wallId: res._id
        });
      }

      // we will store all of our form data in this object
      $scope.formData = {};

    // function to process the form
      $scope.processForm = function() {
        alert('awesome!');
      };

      function errorCallback(res) {
        vm.error = res.data.message;
      }

    }

    //Update Wall
    function update(isValid){
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
        $state.go('walls.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

  }

}());
