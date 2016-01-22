/*global Template, Router, Meteor, Session, moment, $*/
(function () {

    'use strict';

    Template.confirm_create_activity_footer.events({
        'click #go_back_button': function () {
            Router.go('create_activity', {
                event_id: this.event_id,
                default_currency: this.default_currency
            });
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