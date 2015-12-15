/*global Meteor, Ground*/
/*jslint nomen: true */
(function () {

    'use strict';

    Meteor.publish('getUserData', function () {
        return Meteor.users.find({
            _id: this.userId
        });
    });

    Meteor.publish('status', function () {
        return Meteor.Events.find();
    });

    Meteor.Status.allow({
        'insert': function () {
            return true;
        }
    });

    Meteor.methods({

        find_meteor_user: function () {
            return Meteor.Status.findOne({
                meteor_id: Meteor.userId()
            });
        },

        create_meteor_user: function () {
            return Meteor.Status.insert({
                meteor_id: Meteor.userId(),
                is_logged: false
            }, function (error, response) {
                if (error) {
                    throw new Meteor.Error(500, error);
                }
                return response;
            });
        },

        update_logged_status: function (user) {
            return Meteor.Status.update(
                {
                    meteor_id: Meteor.userId()
                },
                {
                    $set: {
                        is_logged: true,
                        user_id: user.user_id,
                        picture: user.picture,
                        name: user.name
                    }
                },
                function (error, response) {
                    if (error) {
                        throw new Meteor.Error(500, error);
                    }
                    return response;
                }
            );
        },

        logout_user: function () {
            return Meteor.Status.update(
                {
                    meteor_id: Meteor.userId()
                },
                {
                    $set: {
                        is_logged: false
                    }
                },
                function (error, response) {
                    if (error) {
                        throw new Meteor.Error(500, error);
                    }
                    return response;
                }
            );
        }

    });

}());