/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/activities', {
        name: 'activities',
        template: 'activities_page',
        waitOn: function () {
            Meteor.subscribe('events');
        },
        data: function () {
            return {
                single_activities: Meteor.Events.find({_id: Session.get('event_id')}, {_id: 0, activities: 1})
            };
        }
    });


}());