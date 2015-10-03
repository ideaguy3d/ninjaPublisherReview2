/**
 * Created by Julius Hernandez on 10/3/2015.
 */
angular.module('ngfireApp').factory('Messages',
    ['$firebaseArray', 'FirebaseUrl',
        function ($firebaseArray, FirebaseUrl) {
            var ref = new Firebase(FirebaseUrl + 'channelMessage');
            return {
                forChannel: function (channelId) {
                    return $firebaseArray(ref.child(channelId))
                }
            };
        }
    ]
);