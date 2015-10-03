'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
    .module('ngfireApp', [
        'firebase',
        'angular-md5',
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/home.html'
            })
            .state('login', {
                url: '/login',
                controller: 'AuthCtrl as auth',
                //resolve just ensures that if we are logged in we're going to redirect
                //to the homepage.
                resolve: {
                    requireNoAuth: function ($state, Auth) {
                        return Auth.$requireAuth().then(function (auth) {
                            $state.go('home');
                        }, function (error) {
                            return;
                        })
                    }
                },
                templateUrl: 'auth/login.html'
            })
            .state('register', {
                url: '/register',
                controller: 'AuthCtrl as auth',
                //resolve just ensures that if we are logged in we're going to redirect
                //to the homepage.
                resolve: {
                    requireNoAuth: function ($state, Auth) {
                        return Auth.$requireAuth().then(function (auth) {
                            $state.go('home');
                        }, function (error) {
                            return;
                        })
                    }
                },
                templateUrl: 'auth/register.html'
            })
            .state('profile',{
                url: '/profile',
                resolve: {
                    auth: function ($state, Users, Auth) {
                        //.catch is shorthand for handling promises we don't want to provide
                        //a success handler for. i.e. if they're not authenticated we want to
                        //send them home.
                        return Auth.$requireAuth().catch(function () {
                            $state.go('home');
                        });
                    },
                    profile: function (Users, Auth) {
                        return Auth.$requireAuth().then(function (auth) {
                            return Users.getProfile(auth.uid).$loaded();
                        })
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    })
    .constant('FirebaseUrl', 'https://juliusproto.firebaseio.com/');
