/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/delete/event/:event_id/:event_title', {
        name: 'confirm_delete_event',
        template: 'confirm_delete_event_page',
        layoutTemplate: 'confirm_delete_event_footer',
        waitOn: function () {
            Meteor.subscribe('events');
        },
        data: function () {
            var params = this.params;
            console.log(params.event_id);
            console.log(params.event_title);
            return {
                event_id: params.event_id,
                event_title: params.event_title
            };
        }
    });

}());