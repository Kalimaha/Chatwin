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
            return {
                event: Meteor.Events.findOne(params.event_id)
            };
        }
    });


}());