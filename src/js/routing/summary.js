/*global Router, Meteor*/
(function () {

    'use strict';

    Router.route('/summary/:event_id/:default_currency', {
        name: 'summary',
        template: 'summary_page',
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
        },
        data: function () {
            var params = this.params;
            return {
                event_id: params.event_id,
                event: Meteor.Events.findOne(params.event_id),
                default_currency: params.default_currency
            };
        }
    });

}());