(function () {
  'use strict';

  describe('Matchings Route Tests', function () {
    // Initialize global variables
    var $scope,
      MatchingsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _MatchingsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      MatchingsService = _MatchingsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('matchings');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/matchings');
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
          MatchingsController,
          mockMatching;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('matchings.view');
          $templateCache.put('modules/matchings/client/views/view-matching.client.view.html', '');

          // create mock Matching
          mockMatching = new MatchingsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Matching Name'
          });

          // Initialize Controller
          MatchingsController = $controller('MatchingsController as vm', {
            $scope: $scope,
            matchingResolve: mockMatching
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:matchingId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.matchingResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            matchingId: 1
          })).toEqual('/matchings/1');
        }));

        it('should attach an Matching to the controller scope', function () {
          expect($scope.vm.matching._id).toBe(mockMatching._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/matchings/client/views/view-matching.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          MatchingsController,
          mockMatching;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('matchings.create');
          $templateCache.put('modules/matchings/client/views/form-matching.client.view.html', '');

          // create mock Matching
          mockMatching = new MatchingsService();

          // Initialize Controller
          MatchingsController = $controller('MatchingsController as vm', {
            $scope: $scope,
            matchingResolve: mockMatching
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.matchingResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/matchings/create');
        }));

        it('should attach an Matching to the controller scope', function () {
          expect($scope.vm.matching._id).toBe(mockMatching._id);
          expect($scope.vm.matching._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/matchings/client/views/form-matching.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          MatchingsController,
          mockMatching;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('matchings.edit');
          $templateCache.put('modules/matchings/client/views/form-matching.client.view.html', '');

          // create mock Matching
          mockMatching = new MatchingsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Matching Name'
          });

          // Initialize Controller
          MatchingsController = $controller('MatchingsController as vm', {
            $scope: $scope,
            matchingResolve: mockMatching
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:matchingId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.matchingResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            matchingId: 1
          })).toEqual('/matchings/1/edit');
        }));

        it('should attach an Matching to the controller scope', function () {
          expect($scope.vm.matching._id).toBe(mockMatching._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/matchings/client/views/form-matching.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
