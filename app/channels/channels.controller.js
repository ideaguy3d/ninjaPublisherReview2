/**
 * Created by Julius Hernandez on 10/3/2015.
 */
angular.module('ngfireApp').controller("ChannelCtrl",
    ['$state', 'Auth', 'Users', 'profile', 'channels',
        function ($state, Auth, Users, profile, channels) {
            var channelCtrl = this;

            Users.setOnline(profile.$id);

            channelCtrl.profile = profile;
            channelCtrl.channels = channels;
            channelCtrl.users = Users.all;

            channelCtrl.getDisplayName = Users.getDisplayName;

            channelCtrl.getGravatar = Users.getGravatar;

            channelCtrl.logout = function () {
                channelCtrl.profile.online = null;
                channelCtrl.profile.$save().then(function () {
                    Auth.$unauth();
                    $state.go('home');
                });
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
