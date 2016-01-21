/*global Template, Router, Meteor, Session, moment, $*/
(function () {

    'use strict';

    Template.confirm_delete_event_footer.events({
        'click #go_back_button': function () {
            Router.go('events');
        },
        'click #delete_event_button': function () {
            Meteor.call('remove_event', this.event_id, function (error) {
                if (error) {
                    Session.set('errorMessage', error.reason);
                    Router.go('error');
                } else {
                    Router.go('events');
                }
            });
        }
    });

}());