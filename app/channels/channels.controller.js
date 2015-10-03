/**
 * Created by Julius Hernandez on 10/3/2015.
 */
angular.module('ngfireApp').controller("ChannelCtrl",
    ['$state', 'Auth', 'Users', 'profile', 'channels',
        function ($state, Auth, Users, profile, channels) {
            var channelCtrl = this;
            channelCtrl.profile = profile;
            channelCtrl.channels = channels;

            channelCtrl.getDisplayName = Users.getDisplayName;
            channelCtrl.getGravatar = Users.getGravatar;

            channelCtrl.logout = function () {
                Auth.$unauth();
                $state.go('home');
            };

            channelCtrl.newChannel = {
                name: ''
            };

            channelCtrl.createChannel = function () {
                channelCtrl.channels.$add(channelCtrl.newChannel).then(function () {
                    channelCtrl.newChannel = {
                        name: ''
                    };
                });
            }
        }
    ]
);
