/*global Template, Router, Meteor, Session*/
(function () {

    'use strict';

    Template.login_page.events({

        'click #facebook_button': function () {
            Meteor.loginWithFacebook({
                requestPermissions: ['email']
            }, function () {
                Meteor.subscribe('status');
                var user_id = 'facebook_' + Meteor.user().services.facebook.id,
                    picture = 'http://graph.facebook.com/' + Meteor.user().services.facebook.id + '/picture/?type=large';
                Meteor.call('update_logged_status', user_id, picture, function (error) {
                    if (error) {
                        Session.set('errorMessage', error.reason);
                        Router.go('error');
                    } else {
                        Router.go('events');
                    }
                });
            });
        },

        'click #google_button': function () {
            Meteor.loginWithGoogle({
                requestPermissions: ['email']
            }, function () {
                Meteor.subscribe('status');
                var user_id = 'google_' + Meteor.user().services.google.id,
                    picture = Meteor.user().services.google.picture;
                Meteor.call('update_logged_status', user_id, picture, function (error) {
                    if (error) {
                        Session.set('errorMessage', error.reason);
                        Router.go('error');
                    } else {
                        Router.go('events');
                    }
                });
            });
        },

        'click #twitter_button': function () {
            Meteor.loginWithTwitter({
                requestPermissions: ['email']
            }, function () {
                Meteor.subscribe('status');
                var user_id = 'twitter_' + Meteor.user().services.twitter.id,
                    picture = Meteor.user().services.twitter.profile_image_url;
                Meteor.call('update_logged_status', user_id, picture, function (error) {
                    if (error) {
                        Session.set('errorMessage', error.reason);
                        Router.go('error');
                    } else {
                        Router.go('events');
                    }
                });
            });
        }

    });

}());