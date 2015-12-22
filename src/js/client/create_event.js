/*global Template, Router, Meteor, Session, $*/
(function () {

    'use strict';

    Template.create_event_page.events({

        'click #back_button': function () {
            Router.go('events');
        },

        'click #create_event_button': function () {
            var event_name = $('#event_name').val();
            if (event_name !== undefined && event_name.length > 0) {
                Meteor.call('create_event', event_name, function (error) {
                    if (error) {
                        Session.set('errorMessage', error.reason);
                        Router.go('error');
                    } else {
                        Router.go('events');
                    }
                });
            } else {
                $('.field').addClass('error');
                $('.form').addClass('warning');
            }
        },

        'keyup #event_name': function () {
            if ($('#event_name').val().length > 0) {
                $('.form').removeClass('warning');
                $('.field').removeClass('error');
            } else {
                $('.form').addClass('warning');
                $('.field').addClass('error');
            }
        }

    });

}());