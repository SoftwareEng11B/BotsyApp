'use strict';

describe('Walls E2E Tests:', function () {
  describe('Test Walls page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/walls');
      expect(element.all(by.repeater('wall in walls')).count()).toEqual(0);
    });
  });
});
