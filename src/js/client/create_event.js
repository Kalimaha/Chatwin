/*global Template, Router, Meteor, Session, $*/
(function () {

    'use strict';

    Template.create_event_page.events({

        'click #back_button': function () {
            Router.go('events');
        },

        'click #create_event_button': function () {
            Meteor.subscribe('events');
            var event_name = $('#event_name').val(),
                user = Session.get('user');
            if (user === undefined) {
                console.log('go to login');
                Router.go('login');
            } else {
                console.log(event_name);
                console.log(user);
                Meteor.call('create_event', event_name, user, function (error, result) {
                    if (error) {
                        Session.set('errorMessage', error.reason);
                        Router.go('error');
                    }
                    console.log(result);
                    Router.go('events');
                });
            }
        }

    });

}());