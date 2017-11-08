(function () {
  'use strict';

  describe('Walls List Controller Tests', function () {
    // Initialize global variables
    var WallsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      WallsService,
      mockWall;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _WallsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      WallsService = _WallsService_;

      // create mock article
      mockWall = new WallsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Wall Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Walls List controller.
      WallsListController = $controller('WallsListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockWallList;

      beforeEach(function () {
        mockWallList = [mockWall, mockWall];
      });

      it('should send a GET request and return all Walls', inject(function (WallsService) {
        // Set POST response
        $httpBackend.expectGET('api/walls').respond(mockWallList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.walls.length).toEqual(2);
        expect($scope.vm.walls[0]).toEqual(mockWall);
        expect($scope.vm.walls[1]).toEqual(mockWall);

      }));
    });
  });
}());
