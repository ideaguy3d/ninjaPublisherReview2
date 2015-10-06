/**
 * Created by Julius Hernandez on 10/2/2015.
 */
angular.module('ngfireApp')
    .controller('ProfileCtrl',
    //md5 is for gravatar
    ['$state', 'md5', 'auth', 'profile',
        function ($state, md5, auth, profile) {
            var profileCtrl = this;

            profileCtrl.profile = profile;
            //console.log("profileCtrl.profile.displayName = "+profileCtrl.profile.displayName);

            //user should be on this page to update their profile. So lets add that functionality
            profileCtrl.updateProfile = function () {
                //this is our gravatar url, .password is coming from the fb Auth obj because
                //we're using pw based authentication. If we were using FaceBook we'd use .Facebook
                profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
                console.log("profileCtrl.profile.email = "+profileCtrl.profile.email);
                profileCtrl.profile.$save().then(function () {
                    $state.go('channels');
                });
            }
        }
    ]
);