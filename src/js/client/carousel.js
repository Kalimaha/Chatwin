/*global Template, Router, Meteor, Session*/
(function () {

    'use strict';

    Template.carousel_page.events({
        'click #go_to_events_button': function () {
            Meteor.subscribe('status');
            Meteor.call('update_first_access_status', function (error, response) {
                if (error) {
                    Session.set('errorMessage', error.reason);
                    Router.go('error');
                } else {
                    Router.go('home');
                }
            });
        }
    });

}());