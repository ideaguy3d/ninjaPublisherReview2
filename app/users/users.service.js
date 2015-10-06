/**
 * Created by Julius Hernandez on 10/2/2015.
 */
angular.module('ngfireApp').factory('Users',
    //these are helper methods for accessing data in the firebase database. Adding
    //something to them will auto update our fbdb
    ['$firebaseArray', '$firebaseObject', 'FirebaseUrl',
        function ($firebaseArray, $firebaseObject, FirebaseUrl) {
            var usersRef = new Firebase(FirebaseUrl + 'users');
            var users = $firebaseArray(usersRef);
            var connectedRef = new Firebase(FirebaseUrl + '.info/connect')

            return {
                getProfile: function (uid) {
                    return $firebaseObject(usersRef.child(uid));
                },
                getDisplayName: function (uid) {
                    //this is a convenience method for fb arrays
                    return users.$getRecord(uid).displayName;
                },
                getGravatar: function (uid) {
                    return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
                },
                setOnline: function (uid) {
                    var connected = $firebaseObject(connectedRef);
                    var online = $firebaseArray(usersRef.child(uid + '/online'));

                    connected.$watch(function () {
                        if(connected.$value === true){
                            online.$add(true).then(function (connectedRef) {
                                connectedRef.onDisconnect().remove();
                            })
                        }
                    })
                },
                all: users
            };
        }
    ]
);