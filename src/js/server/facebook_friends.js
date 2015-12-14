/*global Meteor, Ground*/
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
            return [
                {
                    name: 'Giulia S. from Server'
                }
            ];
        }
    });

}());