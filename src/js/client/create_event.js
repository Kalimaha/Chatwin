/*global Template, Router, Meteor, Session, $*/
(function () {

    'use strict';

    Template.create_event_page.events({

        'click #back_button': function () {
            Router.go('events');
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

    Template.create_event_footer.events({
        'click #create_event_button': function () {
            var event_name = $('#event_name').val(),
                currency = $('#currency').val();
            if (event_name !== undefined && event_name.length > 0) {
                Meteor.call('create_event', event_name, currency, function (error, response) {
                    if (error) {
                        Session.set('errorMessage', error.reason);
                        Router.go('error');
                    } else {
                        Router.go('events');
                    }
                });
            } else {
                $('.form-group.name').addClass('has-error');
            }
        }
    });

    Template.create_event_page.rendered = function () {
        var src = '/images/paper.jpg',
            body = $('body');
        body.css('backgroundImage', 'url(' + src + ')');
        body.css('background-repeat', 'repeat');
        $('.ui.dropdown').dropdown();
        $('.js-example-basic-single').select2();
    };

}());