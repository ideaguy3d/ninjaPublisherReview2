/**
 * Created by Julius Hernandez on 10/3/2015.
 */
angular.module('ngfireApp').controller("ChannelCtrl",
    ['$state', 'Auth', 'Users', 'profile', 'channels',
        function ($state, Auth, Users, profile, channels) {
            var channelCtrl = this;

            //Users.setOnline(profile.$id);

            channelCtrl.profile = profile;
            channelCtrl.channels = channels;
            channelCtrl.users = Users.all;
            channelCtrl.channelClicked = false;
            channelCtrl.getDisplayName = Users.getDisplayName;
            channelCtrl.getGravatar = Users.getGravatar;

            channelCtrl.channelClick = function () {
                console.log("Z channel was just clicked");
                channelCtrl.channelClicked = true;
            };

            channelCtrl.logout = function () {
                Auth.$unauth();
                $state.go('home');
                channelCtrl.profile.online = null;
                channelCtrl.profile.$save().then(
                    function () {//.then() success cb
                        Auth.$unauth();
                        $state.go('home');
                    },
                    function (error) {//.then() error cb
                        //even if there's an error we still need to logout, so logout
                        Auth.$unauth();
                        $state.go('home');
                        console.log("error in channelCtrl.logout:: " + error);
                    }
                );
            };

            channelCtrl.newChannel = {
                name: ''
            };

            channelCtrl.createChannel = function () {
                channelCtrl.channels.$add(channelCtrl.newChannel).then(function (ref) {
                    //console.log("from ChannelCtrl, ref.key() = "+ref.key());
                    $state.go('channels.messages', {channelId: ref.key()});
                });
            }
        }
    ]
);
