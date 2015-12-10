/*global Template, Router, Meteor, Session*/
(function () {

    'use strict';

    Template.error_page.helpers({
        errorMessage: function () {
            return Session.get('errorMessage');
        }
    });

    Template.error_page.events({
        'click #back_button': function () {
            Router.go('create_event');
        }
    });

}());