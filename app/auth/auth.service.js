/**
 * Created by Julius Hernandez on 10/1/2015.
 */

angular.module('ngfireApp')
    .factory('Auth', ['$firebaseAuth', 'FirebaseUrl',
        function ($firebaseAuth, FirebaseUrl) {
            var ref = new Firebase(FirebaseUrl);
            var auth = $firebaseAuth(ref);
            return auth;
    }]
);






