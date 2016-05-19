/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/map/:event_id', {
        name: 'map',
        template: 'map_page',
        waitOn: function () {
            Meteor.subscribe('events');
        },
        data: function () {
            var params = this.params;
            return {
                event: Meteor.Events.findOne(params.event_id),
                event_id: params.event_id
            };
        }
    });


}());
