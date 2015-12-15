/*global Template, Router, Meteor, Session, $*/
(function () {

    'use strict';

    Template.create_event_page.events({

        'click #back_button': function () {
            Router.go('events');
        },

        'click #create_event_button': function () {
            var event_name = $('#event_name').val(),
                user = Session.get('user');
            Meteor.subscribe('events');
            Meteor.call('create_event', event_name, user, function (error) {
                if (error) {
                    Session.set('errorMessage', error.reason);
                    Router.go('error');
                }
                Router.go('events');
            });
        }

    });

}());