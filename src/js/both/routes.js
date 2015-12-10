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
                    console.log('exists');
                    console.log(result);
                    console.log(result.is_logged);
                    if (result.is_logged === true) {
                        Router.go('events');
                    } else {
                        Router.go('login');
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

    Router.route('/create/activity', {
        name: 'create_activity',
        template: 'create_activity_page'
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
        template: 'create_event_page'
    });

    Router.route('/error', {
        name: 'error',
        template: 'error_page'
    });

}());