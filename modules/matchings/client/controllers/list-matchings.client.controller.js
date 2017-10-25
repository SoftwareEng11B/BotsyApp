(function () {
  'use strict';

  angular
    .module('matchings')
    .controller('MatchingsListController', MatchingsListController);

  MatchingsListController.$inject = ['MatchingsService'];

  function MatchingsListController(MatchingsService) {
    var vm = this;

    vm.matchings = MatchingsService.query();
  }
}());
