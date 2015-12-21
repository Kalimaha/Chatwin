/*global Template, Router, Meteor, Session*/
(function () {

    'use strict';

    Template.login_page.events({

        'click #facebook_button': function () {
            Meteor.loginWithFacebook({
                requestPermissions: ['email', 'user_friends']
            }, function () {
                var user = Meteor.user();
                console.log(user);
                console.log(user === undefined);
                if (user !== undefined) {
                    Router.go('events');
                } else {
                    Session.set('errorMessage', 'Facebook login failed.');
                    Router.go('error');
                }
                /* picture = 'http://graph.facebook.com/' + Meteor.user().services.facebook.id + '/picture/?type=large' */
            });
        },

        'click #google_button': function () {
            Meteor.loginWithGoogle({
                requestPermissions: ['email']
            }, function () {
                Meteor.subscribe('status');
                var user_id = 'google_' + Meteor.user().services.google.id,
                    picture = Meteor.user().services.google.picture,
                    name = Meteor.user().services.google.given_name,
                    user = {
                        user_id: user_id,
                        picture: picture,
                        name: name
                    };
                Meteor.call('update_logged_status', user, function (error) {
                    if (error) {
                        Session.set('errorMessage', error.reason);
                        Router.go('error');
                    } else {
                        Session.set('user', user);
                        Router.go('events');
                    }
                });
            });
        }

    });

}());