/*global Router, Meteor, Session*/
(function () {

    'use strict';

    Router.configure({
        layoutTemplate: 'footer'
    });

    Router.route('/', {
        name: 'home',
        waitOn: function () {
            return Meteor.subscribe('status');
        },
        before: function () {
            Meteor.call('find_meteor_user', function (error, result) {
                if (error) {
                    Session.set('errorMessage', error.reason);
                    Router.go('error');
                }
                if (result === undefined) {
                    Meteor.call('create_meteor_user', function (error, result) {
                        if (error) {
                            Session.set('errorMessage', error.reason);
                            Router.go('error');
                        }
                        Router.go('carousel');
                    });
                } else {
                    if (result.first_access) {
                        Router.go('carousel');
                    } else {
                        if (result.is_logged === true) {
                            Router.go('events');
                        } else {
                            Router.go('login');
                        }
                    }
                }
            });
        }
    });

    Router.route('/login', {
        name: 'login',
        template: 'login_page',
        layoutTemplate: null,
        waitOn: function () {
            return Meteor.subscribe('getUserData');
        }
    });

    Router.route('/logout', {
        name: 'logout',
        waitOn: function () {
            return Meteor.subscribe('status');
        },
        before: function () {
            Meteor.call('logout_user', function (error, response) {
                if (error) {
                    Session.set('errorMessage', error.reason);
                    Router.go('error');
                }
            });
            Router.go('logout_success');
        }
    });

    Router.route('/logout/success', {
        name: 'logout_success',
        template: 'logout_page'
    });

    Router.route('/activities', {
        name: 'activities',
        template: 'activities_page'
    });

    Router.route('/carousel', {
        name: 'carousel',
        template: 'carousel_page'
    });

    Router.route('/events', {
        name: 'events',
        template: 'events_page',
        waitOn: function () {
            return Meteor.subscribe('events');
        },
        data: {
            single_events: Meteor.Events.find()
        }
    });

    Router.route('/create/event', {
        name: 'create_event',
        template: 'create_event_page',
        waitOn: function () {
            return Meteor.subscribe('events');
        }
    });

    Router.route('/create/activity', {
        name: 'create_activity',
        template: 'create_activity_page',
        waitOn: function () {
            Meteor.subscribe('activities');
            Meteor.subscribe('facebook_friends');
            Meteor.call('get_facebook_friends');
        },
        data: {
            single_friends: Meteor.FacebookFriends.find()
        }
    });

    Router.route('/error', {
        name: 'error',
        template: 'error_page'
    });

}());