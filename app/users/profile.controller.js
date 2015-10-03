/**
 * Created by Julius Hernandez on 10/2/2015.
 */

angular.module('ngfireApp')
    .controller('ProfileCtrl',
    ['$state', 'md5', 'auth', 'profile',
        function ($state, md5, auth, profile) {
            var profileCtrl = this;
            profileCtrl.profile = profile;
            profileCtrl.updateProfile = function () {

            }
        }
    ]
);