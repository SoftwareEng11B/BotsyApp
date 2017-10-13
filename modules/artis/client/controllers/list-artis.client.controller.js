(function () {
  'use strict';

  angular
    .module('artis')
    .controller('ArtisListController', ArtisListController);

  ArtisListController.$inject = ['ArtisService'];

  function ArtisListController(ArtisService) {
    var vm = this;

    vm.artis = ArtisService.query();
  }
}());
