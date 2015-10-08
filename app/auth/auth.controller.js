/**
 * Created by Julius Hernandez on 10/1/2015.
 */

angular.module('ngfireApp')
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
                //console.log("user.email = "+authCtrl.user.email+", user.password = "+authCtrl.user.password);
                Auth.$authWithPassword(authCtrl.user)
                    .then(function (auth) {//login did succeed
                        $state.go('channels');
                    }, function (error) {//login did NOT succeed
                        authCtrl.error = error;
                    });
            };

            authCtrl.register = function () {
                Auth.$createUser(authCtrl.user).then(function (user) {
                    //authCtrl.user will still be pre-filled so there will be a match
                    authCtrl.login();
                }, function (error) {
                    authCtrl.error = error;
                });
            }
        }]
);








