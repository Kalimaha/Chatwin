/*global Meteor, Ground, HTTP*/
(function () {

    'use strict';

    Meteor.Friends.allow({
        'insert': function () {
            return true;
        },
        'remove': function () {
            return true;
        }
    });

    Meteor.publish('friends', function () {
        return Meteor.Friends.find();
    });

    Meteor.methods({
        save_facebook_friends: function () {
            var user = Meteor.users.findOne(this.userId),
                access_token = user.services.facebook.accessToken,
                i;
            HTTP.get('https://graph.facebook.com/v2.3/me/taggable_friends?limit=5000', {params: {access_token: access_token}}, function (error, result) {
                if (error) {
                    throw new Meteor.Error(500, 'Error while fetching Facebook friends.');
                }
                if (result.data.data.length !== Meteor.Friends.find({owner: Meteor.userId()}).count()) {
                    Meteor.Friends.remove();
                    for (i = 0; i < result.data.data.length; i += 1) {
                        Meteor.Friends.insert({
                            name: result.data.data[i].name,
                            title: result.data.data[i].name,
                            id: result.data.data[i].id,
                            picture: result.data.data[i].picture.data.url,
                            owner: Meteor.userId()
                        });
                    }
                }
            });
        }
    });

}());