/*global Template, Router, Meteor, Session, $*/
(function () {

    'use strict';

    Template.create_activity_page.events({

        'click #back_button': function () {
            Router.go('events');
        },

        'click .add_activity_button': function () {
            console.log(this);
            Meteor.subscribe('events');
            Meteor.call('add_activity', this.event_id, function (error, result) {
                if (error) {
                    Session.set('errorMessage', error.reason);
                    Router.go('error');
                }
                console.log(result);
            });
        }

    });

    Template.create_activity_page.rendered = function () {
        $('.ui.dropdown').dropdown();
    };

}());