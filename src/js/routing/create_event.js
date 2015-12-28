/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/create/event', {
        name: 'create_event',
        template: 'create_event_page',
        waitOn: function () {
            return Meteor.subscribe('events');
        }
    });

}());