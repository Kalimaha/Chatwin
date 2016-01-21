/*global Template, Router, Meteor, Session*/
(function () {

    'use strict';

    Template.error_page.helpers({
        errorMessage: function () {
            return Session.get('errorMessage');
        }
    });

}());