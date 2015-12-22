/*global Template, Router, Meteor, Session*/
(function () {

    'use strict';

    Template.login_page.events({

        'click #facebook_button': function () {
            Meteor.loginWithFacebook({
                requestPermissions: ['email', 'user_friends']
            }, function () {
                var user = Meteor.user();
                if (user !== undefined) {
                    Router.go('events');
                } else {
                    Session.set('errorMessage', 'Facebook login failed.');
                    Router.go('error');
                }
            });
        },

        'click #google_button': function () {
            Meteor.loginWithGoogle({
                requestPermissions: ['email']
            }, function () {
                var user = Meteor.user();
                if (user !== undefined) {
                    Router.go('events');
                } else {
                    Session.set('errorMessage', 'Google login failed.');
                    Router.go('error');
                }
            });
        }

    });

}());