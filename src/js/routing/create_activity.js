/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/create/activity/:event_id/:default_currency', {
        name: 'create_activity',
        template: 'create_activity_page',
        layoutTemplate: 'create_activity_footer',
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
                single_friends: Meteor.Friends.find({owner: Meteor.userId()}, {sort: {name: 1}}),
                event_id: params.event_id,
                user: Meteor.user(),
                default_currency: params.default_currency
            };
        }
    });

}());