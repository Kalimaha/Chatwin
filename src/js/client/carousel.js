/*global Template, Router, Meteor, Session*/
(function () {

    'use strict';

    Template.carousel_page.events({
        'click #go_to_events_button': function () {
            Router.go('events');
        }
    });

}());