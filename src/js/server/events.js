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
        create_event: function (event_name) {
            var user = Meteor.Status.findOne();
            if (user === undefined) {
                throw new Meteor.Error(422, 'not-authorized');
            }
            if (!user.isLogged) {
                throw new Meteor.Error(422, 'not-authorized');
            }
            return Meteor.Events.insert({
                name: event_name,
                creation_date: new Date(),
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
        }
    });

}());