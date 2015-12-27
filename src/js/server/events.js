/*global Meteor, Ground*/
(function () {

    'use strict';

    Meteor.Events.allow({

        'insert': function () {
            return true;
        },

        'remove': function () {
            return true;
        }

    });

    Meteor.publish('events', function () {
        return Meteor.Events.find();
    });

    Meteor.methods({

        create_event: function (event_name) {
            return Meteor.Events.insert({
                name: event_name,
                creation_date: new Date(),
                date_last_update: new Date(),
                owner: Meteor.userId(),
                activities: [],
                total: 0,
                users: [
                    Meteor.create_event_user()
                ]
            }, function (error, result) {
                if (error) {
                    throw new Meteor.Error(500, 'Error while creating a new event.');
                }
                return result;
            });
        },

        remove_event: function (event_id) {
            return Meteor.Events.remove(event_id, function (error, result) {
                if (error) {
                    throw new Meteor.Error(500, 'Error while creating a new event.');
                }
                return result;
            });
        },

        show_activities: function (event_id) {
            alert(event_id);
        },

        add_activity: function (event_id) {
            return Meteor.Events.update(
                event_id,
                {
                    $push: {
                        activities: {
                            name: 'Edited'
                        }
                    }
                },
                function (error, result) {
                    if (error) {
                        throw new Meteor.Error(500, 'Error while creating a new event.');
                    }
                    return result;
                }
            );
        }

    });

    Meteor.create_event_user = function () {
        var user,
            isFacebook,
            isGoogle,
            event_user;
        user = Meteor.users.findOne(this.userId);
        isFacebook = user.services.facebook !== undefined;
        isGoogle = user.services.google !== undefined;
        if (isFacebook) {
            event_user = {
                email: user.services.facebook.email,
                name: user.services.facebook.name,
                first_name: user.services.facebook.first_name,
                last_name: user.services.facebook.last_name,
                picture: 'http://graph.facebook.com/' + user.services.facebook.id + '/picture/?type=large'
            };
        }
        if (isGoogle) {
            event_user = {
                email: user.services.google.email,
                name: user.services.google.name,
                first_name: user.services.google.given_name,
                last_name: user.services.google.family_name,
                picture: user.services.google.picture
            };
        }
        return event_user;
    };

}());