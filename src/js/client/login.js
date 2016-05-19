/*global Template, Router, Meteor, Session, $, HTTP*/
(function () {

    'use strict';

    Template.login_page.events({

        'click #facebook_button': function () {
            Meteor.loginWithFacebook({
                requestPermissions: ['email', 'user_friends']
            }, function () {
                var user = Meteor.user();
                if (user !== undefined) {
                    Meteor.call('save_facebook_friends', function (error, response) {
                        if (error) {
                            Session.set('errorMessage', error.reason);
                            Router.go('error');
                        } else {
                            Router.go('events');
                        }
                    });
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

    Template.login_page.rendered = function () {
        var src = '/images/leather.jpg',
            body = $('body');
        // body.css('backgroundImage', 'url(' + src + ')');
        // body.css('background-repeat', 'repeat');
    };

}());
