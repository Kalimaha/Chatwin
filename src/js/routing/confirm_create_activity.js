/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/confirm/create/activity/:event_id/:default_currency', {
        name: 'confirm_create_activity',
        template: 'confirm_create_activity_page',
        layoutTemplate: 'confirm_create_activity_footer',
        waitOn: function () {
            Meteor.subscribe('activities');
            Meteor.subscribe('friends');
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
        },
        data: function () {
            var params = this.params;
            return {
                event_id: params.event_id,
                activity: Session.get('activity'),
                default_currency: params.default_currency
            };
        }
    });

}());