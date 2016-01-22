/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/create/event', {
        layoutTemplate: 'create_event_footer',
        name: 'create_event',
        template: 'create_event_page',
        waitOn: function () {
            Meteor.subscribe('events');
            return Meteor.subscribe('getUserData');
        },
        onBeforeAction: function () {
            var u = Meteor.user();
            if (u === null || u.services === null) {
                return Router.go('login');
            }
            if (u.services === undefined || (u.services.facebook === undefined && u.services.google === undefined)) {
                return Router.go('login');
            } else {
                return this.next();
            }
        }
    });

}());