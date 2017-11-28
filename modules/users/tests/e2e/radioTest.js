'use strict';

describe('Users E2E Tests:', function () {
  var user1 = {
    firstName: 'test',
    lastName: 'user',
    email: 'test.user@meanjs.com',
    username: 'testUser',
    password: 'P@$$w0rd!!'
  };

  var user2 = {
    firstName: 'test',
    lastName: 'user2',
    email: 'test.user2@meanjs.com',
    username: 'testUser2',
    password: 'P@$$w0rd!!'
  };

  var signout = function () {
    // Make sure user is signed out first
    browser.get('http://localhost:3000/authentication/signout');
    // Delete all cookies
    browser.driver.manage().deleteAllCookies();
  };
  describe('Landing Page functionality', function() {
    beforeEach(function() {
      browser.get('http://localhost:3000');
      browser.sleep(3000);
    });

    it('should redirect to the sign-up page', function () {
      element(by.id('signup')).click();
      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/authentication/signup');
    });
    it('should redirect to the sign-in page', function () {
      element(by.id('signin')).click();
      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/authentication/signin');
    });
  /*it('should redirect to the botsy about page', function () {
    element(by.id('about')).click();
    expect(browser.getCurrentUrl()).toEqual('https://www.botsy.com/pages/about-us');
  });*/
  });

  describe('Signup Validation', function () {
   
    it('Should Successfully register new user', function () {
      browser.get('http://localhost:3000/authentication/signup');
      // Enter FirstName
      element(by.model('credentials.firstName')).sendKeys(user1.firstName);
      // Enter LastName
      element(by.model('credentials.lastName')).sendKeys(user1.lastName);
      // Enter Email
      element(by.model('credentials.email')).sendKeys(user1.email);
      // Enter UserName
      element(by.model('credentials.username')).sendKeys(user1.username);
      // Enter Password
      element(by.model('credentials.password')).sendKeys(user1.password);
      // Click radio button
      element(by.id('user')).click(); 
       // Click Submit button
      element(by.css('button[type="submit"]')).click();



      expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');
    });

    it('Should report Email already exists', function () {
      // Make sure user is signed out first
      signout();
      // Signup
      browser.get('http://localhost:3000/authentication/signup');
      // Enter First Name
      element(by.model('credentials.firstName')).sendKeys(user2.firstName);
      // Enter Last Name
      element(by.model('credentials.lastName')).sendKeys(user2.lastName);
      // Enter Email
      element(by.model('credentials.email')).sendKeys(user1.email);
      // Enter Username
      element(by.model('credentials.username')).sendKeys(user2.username);
      // Enter Invalid Password
      element(by.model('credentials.password')).sendKeys(user2.password);
      // Click Submit button
      element(by.css('button[type=submit]')).click();
      // Password Error
      expect(element.all(by.css('strong')).get(0).getText()).toBe('Email already exists');
    });

    it('Should report Username already exists', function () {
      // Signup
      browser.get('http://localhost:3000/authentication/signup');
      // Enter First Name
      element(by.model('credentials.firstName')).sendKeys(user2.firstName);
      // Enter Last Name
      element(by.model('credentials.lastName')).sendKeys(user2.lastName);
      // Enter Email
      element(by.model('credentials.email')).sendKeys(user2.email);
      // Enter Username
      element(by.model('credentials.username')).sendKeys(user1.username);
      // Enter Invalid Password
      element(by.model('credentials.password')).sendKeys(user2.password);
      // Click Submit button
      element(by.css('button[type=submit]')).click();
      // Password Error
      expect(element.all(by.css('strong')).get(0).getText()).toBe('Username already exists');
    });

  });

 
});
