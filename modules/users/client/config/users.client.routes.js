'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html'
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html'
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html'
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
      })
      .state('contact-us', {
        url: '/contact-us',
        templateUrl: 'modules/users/client/views/contact-us.client.view.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html'
      })
      .state('admin-homepage', {
        url:'/admin',
        templateUrl: '/modules/core/client/views/home.admin.view.html'
      })
      .state('customer-homepage', {
        url: '/customer-homepage',
        templateUrl: 'modules/users/client/views/customer_homepage.html'
      })
      .state('wall-information', {
        url: '/mural-request-wall-information',
        templateUrl: 'modules/users/client/views/mural_request/wall-information.html'
      })
      .state('mural-select', {
        url: '/mural-request-mural-select',
        templateUrl: 'modules/users/client/views/mural_request/mural-select.html'
      })
      .state('DD-blank', {
        url: '/mural-request-DD-blank',
        templateUrl: 'modules/users/client/views/mural_request/DD-blank.html'
      })
      .state('logo-page', {
        url: '/mural-request-logo-page',
        templateUrl: 'modules/users/client/views/mural_request/logo-page.html'
      })
      .state('preview-request', {
        url: '/mural-request-preview',
        templateUrl: 'modules/users/client/views/mural_request/preview-information.html'
      })
      .state('current-request', {
        url: '/mural-request-current',
        templateUrl: 'modules/users/client/views/mural_request/current-requests.html'
      })
      .state('artist-homepage',{
        url:'/artist-homepage',
        templateUrl:'modules/artists/client/views/artist-home-page.html'
      });

  }
]);
