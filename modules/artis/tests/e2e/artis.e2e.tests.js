'use strict';

describe('Artis E2E Tests:', function () {
  describe('Test Artis page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/artis');
      expect(element.all(by.repeater('arti in artis')).count()).toEqual(0);
    });
  });
});
