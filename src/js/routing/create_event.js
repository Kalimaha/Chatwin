/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/create/event', {
        layoutTemplate: 'create_event_footer',
        name: 'create_event',
        template: 'create_event_page',
        waitOn: function () {
            return Meteor.subscribe('events');
        }
    });

}());