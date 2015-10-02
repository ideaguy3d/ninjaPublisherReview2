/**
 * Created by Julius Hernandez on 10/1/2015.
 */

angular.module('angularfireSlackApp')
    .controller('AuthCtrl', ['Auth', '$state',
        function (Auth, $state) {//$state to use .go() to auto send users to a different page
            //to use 'controller as' syntax
            var authCtrl = this;
            authCtrl.user = {
                //this'll be tied an ngModel that'll auto fill this obj
                email: '',
                password: ''
            };

            authCtrl.login = function () {
                Auth.$authWithPassword(authCtrl.user).then(function (auth) {
                    $state.go('home');
                }, function (error) {
                    authCtrl.error = error;
                })
            };

            authCtrl.register = function () {
                Auth.$createUser(authCtrl.user).then(function (user) {
                    authCtrl.login();
                }, function (error) {
                    authCtrl.error = error;
                })
            }
        }]
);








