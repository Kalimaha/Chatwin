/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/activities/:event_id', {
        name: 'activities',
        template: 'activities_page',
        waitOn: function () {
            Meteor.subscribe('events');
        },
        data: function () {
            var params = this.params;
            console.log(params.event_id);
            console.log(Meteor.Events.find({_id: params.event_id}, {_id: 0, activities: 1}).count());
            console.log(Meteor.Events.find({_id: params.event_id}, {_id: 0, activities: 1}).activities);
            return {
                event: Meteor.Events.findOne(params.event_id)
            };
        }
    });


}());