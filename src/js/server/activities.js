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

    });

}());