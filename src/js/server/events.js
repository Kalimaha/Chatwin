/*global Meteor, Ground*/
(function () {

    'use strict';

    Meteor.Events.allow({
        'insert': function () {
            return true;
        }
    });

    Meteor.publish('events', function () {
        return Meteor.Events.find();
    });

    Meteor.methods({
        create_event: function (event_name, user) {
            if (user === undefined) {
                throw new Meteor.Error(500, 'Undefined user.');
            } else {
                if (user.is_logged === false) {
                    throw new Meteor.Error(500, 'User is not logged.');
                } else {
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
                        console.log('after insert');
                        console.log(error);
                        console.log(result);
                        if (error) {
                            throw new Meteor.Error(500, 'Error while creating a new event.');
                        }
                        return result;
                    });
                }
            }
        }
    });

}());