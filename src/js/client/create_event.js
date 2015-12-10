/*global Template, Router, Meteor, Session*/
(function () {

    'use strict';

    Template.create_event_page.events({

        'click #back_button': function () {
            Router.go('events');
        },

        'submit form': function (event) {
            event.preventDefault();
            var event_name = event.target.event_name.value;
            Meteor.call('create_event', event_name, function (error) {
                if (error) {
                    Session.set('errorMessage', error);
                    Router.go('error');
                }
                Router.go('events');
            });
        }

    });

}());