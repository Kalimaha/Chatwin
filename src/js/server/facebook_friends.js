/*global Meteor, Ground, HTTP*/
(function () {

    'use strict';

    Meteor.FacebookFriends.allow({
        'insert': function () {
            return true;
        }
    });

    Meteor.publish('facebook_friends', function () {
        return Meteor.FacebookFriends.find();
    });

    Meteor.methods({
        get_facebook_friends: function () {
            var user = Meteor.users.findOne(this.userId),
                access_token = user.services.facebook.accessToken;
            HTTP.get('https://graph.facebook.com/v2.3/me/taggable_friends?limit=5000', {params: {access_token: access_token}}, function (error, result) {
                if (error) {
                    throw new Meteor.Error(500, 'Error while fetching Facebook friends.');
                }
                console.log(result.data.data.length);
                for (var i = 0; i < result.data.data.length; i += 1) {
                    Meteor.FacebookFriends.insert({
                        name: result.data.data[i].name,
                        title: result.data.data[i].name,
                        id: result.data.data[i].id,
                        picture:  result.data.data[i].picture.data.url
                    });
                }
            });
        }
    });

}());