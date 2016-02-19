/*global Router, Meteor, Session*/
(function () {

    'use strict';

    Router.route('/summary/:event_id/:default_currency', {
        name: 'summary',
        template: 'summary_page',
        waitOn: function () {
            var params = this.params;
            Meteor.subscribe('events');
            Meteor.subscribe('summary');
            Meteor.subscribe('getUserData');
            Meteor.call('create_summary', Meteor.Events.findOne(params.event_id), params.default_currency, function (error, response) {
                if (error) {
                    Session.set('errorMessage', error.reason);
                    Router.go('error');
                }
            });
        },
        onBeforeAction: function () {
            var u = Meteor.user(),
                that = this;
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
                summary_notes: Meteor.Summary.find({
                    event_id: params.event_id
                })
            };
        }
    });

}());