(function () {
  'use strict';

  describe('Walls Route Tests', function () {
    // Initialize global variables
    var $scope,
      WallsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _WallsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      WallsService = _WallsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('walls');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/walls');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          WallsController,
          mockWall;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('walls.view');
          $templateCache.put('modules/walls/client/views/view-wall.client.view.html', '');

          // create mock Wall
          mockWall = new WallsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Wall Name'
          });

          // Initialize Controller
          WallsController = $controller('WallsController as vm', {
            $scope: $scope,
            wallResolve: mockWall
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:wallId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.wallResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            wallId: 1
          })).toEqual('/walls/1');
        }));

        it('should attach an Wall to the controller scope', function () {
          expect($scope.vm.wall._id).toBe(mockWall._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/walls/client/views/view-wall.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          WallsController,
          mockWall;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('walls.create');
          $templateCache.put('modules/walls/client/views/form-wall.client.view.html', '');

          // create mock Wall
          mockWall = new WallsService();

          // Initialize Controller
          WallsController = $controller('WallsController as vm', {
            $scope: $scope,
            wallResolve: mockWall
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.wallResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/walls/create');
        }));

        it('should attach an Wall to the controller scope', function () {
          expect($scope.vm.wall._id).toBe(mockWall._id);
          expect($scope.vm.wall._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/walls/client/views/form-wall.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          WallsController,
          mockWall;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('walls.edit');
          $templateCache.put('modules/walls/client/views/form-wall.client.view.html', '');

          // create mock Wall
          mockWall = new WallsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Wall Name'
          });

          // Initialize Controller
          WallsController = $controller('WallsController as vm', {
            $scope: $scope,
            wallResolve: mockWall
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:wallId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.wallResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            wallId: 1
          })).toEqual('/walls/1/edit');
        }));

        it('should attach an Wall to the controller scope', function () {
          expect($scope.vm.wall._id).toBe(mockWall._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/walls/client/views/form-wall.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
