/*global Template, Router, Meteor, Session*/
(function () {

    'use strict';

    Template.events_page.events({
        'click #create_button': function () {
            Router.go('create_event');
        }
    });

}());