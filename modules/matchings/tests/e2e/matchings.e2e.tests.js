'use strict';

describe('Matchings E2E Tests:', function () {
  describe('Test Matchings page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/matchings');
      expect(element.all(by.repeater('matching in matchings')).count()).toEqual(0);
    });
  });
});
