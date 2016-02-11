/*global Meteor, Ground*/
(function () {

    'use strict';

    Meteor.Activities.allow({
        'insert': function () {
            return true;
        }
    });

    Meteor.publish('activities', function () {
        return Meteor.Events.find();
    });

    Meteor.methods({
        'delete_activity': function (event_id, activity_id, activity_cost) {
            return Meteor.Events.update(
                event_id,
                {
                    $pull: {
                        activities: {
                            id: activity_id
                        }
                    },
                    $inc: {
                        total: -1 * parseFloat(activity_cost)
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