'use strict';

/**
 * @ngdoc overview
 * @name angularfireApp
 * @description
 * # angularfireApp
 *
 * Main module of the application.
 */
angular
    .module('ngfireApp', ['firebase', 'angular-md5', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
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
                            $state.go('channels');
                        }, function (error) {
                            console.log(".state('login',... there was an error in 'requireNoAuth, "+error);
                            return;
                        });
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
                            $state.go('channels');
                        }, function (error) {
                            return;
                        });
                    }
                },
                templateUrl: 'auth/register.html'
            })
            .state('profile', {
                url: '/profile',
                controller: 'ProfileCtrl as profile',
                templateUrl: 'users/profile.html',
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
                            //.$loaded returns a promise that gets resolved when fb data is available locally
                            return Users.getProfile(auth.uid).$loaded();
                        });
                    }
                }
            })
            .state('channels', {
                url: '/channels',
                controller: 'ChannelCtrl as channel',
                templateUrl: 'channels/channels.html',
                resolve: {//resolve these 2 dependencies.
                    channels: function (Channels) {
                        //this 'promises' the firebaseArray of channels
                        return Channels.$loaded();
                    },
                    profile: function ($state, Auth, Users) {
                        //ensure the user has a displayName, otherwise send to the profile state.
                        //and if the user is not authenticated send to the home state.
                        return Auth.$requireAuth().then(function (auth) {
                            return Users.getProfile(auth.uid).$loaded().then(function (profile) {
                                if(profile.displayName) {
                                    //console.log("your logged in: "+profile.displayName);
                                    return profile;
                                }
                                else $state.go('profile');
                            }, function (error) {
                                console.log("there was an error getting the profile, error ="+error);
                                $state.go('home');
                            });
                        });
                    }
                }
            })
            .state('channels.messages', {
                url: '/{channelId}/messages',
                templateUrl: 'channels/messages.html',
                controller: 'MessagesCtrl as messages',
                resolve: {
                    //ensure the messages and channelName are available imm! upon entering this state
                    messages: function ($stateParams, Messages) {
                        return Messages.forChannel($stateParams.channelId).$loaded();
                    },
                    //this'll be what we use to display the channels' name in the messages pane
                    channelName: function ($stateParams, channels) {
                        return '#'+channels.$getRecord($stateParams.channelId).name;
                    }
                }
            })
            .state('channels.direct', {
                url: '/{uid}/messages/direct',
                templateUrl: 'channels/messages.html',
                controller: 'MessagesCtrl as messages',
                resolve: {
                    messages: function ($state, Messages, profile) {
                        return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
                    },
                    channelName: function ($stateParams, Users) {
                        return Users.all.$loaded().then(function () {
                            return '@'+Users.getDisplayName($stateParams.uid);
                        })
                    }
                }
            })
            .state('channels.create', {
                url: '/create',
                templateUrl: 'channels/create.html',
                controller: 'ChannelCtrl as channel'
            })
            .state('publisher_details', {
                url: '/{publisher}',
                controller: 'HomeController',
                templateUrl: 'core/views/template-publisher.html'
            })
            .state('indie_devs', {
                url: '/indie_devs/indie',
                controller: 'AuthCtrl as auth',
                templateUrl: 'core/views/indie_devs.html'
            })
            .state('ninja_zone', {
                url: '/ninja_zone_enter/enter',
                resolve: {
                    requireNoAuth: function ($state, Auth) {
                        return Auth.$requireAuth().then(function (auth) {
                            $state.go('channels');
                        }, function (error) {
                            return;
                        });
                    }
                },
                templateUrl: 'home/ninja_zone.html'
            });

        $urlRouterProvider.otherwise('/');
    })
    .constant('FirebaseUrl', 'https://juliusproto.firebaseio.com/');
