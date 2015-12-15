/*global Template, Router, Meteor, Session*/
(function () {

    'use strict';

    Template.create_event_page.events({

        'click #back_button': function () {
            Router.go('events');
        },

        'submit form': function (event) {
            event.preventDefault();
            var event_name = event.target.event_name.value,
                user_id = Session.get('user_id');
            Meteor.call('create_event', event_name, user_id, function (error) {
                if (error) {
                    Session.set('errorMessage', error.reason);
                    Router.go('error');
                }
                Router.go('events');
            });
        }

    });

}());