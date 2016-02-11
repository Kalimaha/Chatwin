/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/delete/activity/:event_id/:activity_id/:activity_title/:default_currency', {
        name: 'confirm_delete_activity',
        template: 'confirm_delete_activity_page',
        layoutTemplate: 'confirm_delete_activity_footer',
        waitOn: function () {
            Meteor.subscribe('events');
        },
        data: function () {
            var params = this.params;
            return {
                event_id: params.event_id,
                activity_id: params.activity_id,
                default_currency: params.default_currency,
                activity_title: params.activity_title
            };
        }
    });

}());