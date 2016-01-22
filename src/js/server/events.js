/*global Meteor, Ground*/
(function () {

    'use strict';

    Meteor.Events.allow({

        'insert': function () {
            return true;
        },

        'remove': function () {
            return true;
        },

        'update': function () {
            return true;
        }

    });

    Meteor.publish('events', function () {
        return Meteor.Events.find();
    });

    Meteor.methods({

        create_event: function (event_name, currency) {
            return Meteor.Events.insert({
                name: event_name,
                currency: currency,
                creation_date: new Date(),
                date_last_update: new Date(),
                owner: Meteor.userId(),
                activities: [],
                total: 0.0,
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
        },

        add_user_to_event: function (event_id, user) {
            return Meteor.Events.update(
                {
                    users: {
                        $not: {
                            $elemMatch: {
                                user_id: user.user_id
                            }
                        }
                    }
                },
                {
                    $addToSet: {
                        users: user
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
        user = Meteor.user();
        isFacebook = user.services.facebook !== undefined;
        isGoogle = user.services.google !== undefined;
        if (isFacebook) {
            event_user = {
                user_id: 'facebook_' + user.services.facebook.id,
                email: user.services.facebook.email,
                name: user.services.facebook.name,
                first_name: user.services.facebook.first_name,
                last_name: user.services.facebook.last_name,
                picture: 'http://graph.facebook.com/' + user.services.facebook.id + '/picture/?type=large'
            };
        }
        if (isGoogle) {
            event_user = {
                user_id: 'google_' + user.services.google.id,
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