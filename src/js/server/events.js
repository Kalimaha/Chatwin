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
        create_event: function (event_name, user) {
            if (user === undefined || user.is_logged === false) {
                throw new Meteor.Error(500, 'Undefined user.');
            }
            return Meteor.Events.insert({
                name: event_name,
                creation_date: new Date(),
                date_last_update: new Date(),
                owner: user.user_id,
                activities: [],
                total: 0,
                users: [
                    user
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

}());