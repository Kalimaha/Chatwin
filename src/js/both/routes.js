/*global Router, Meteor, Session, $*/
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
                        Router.go('login');
                    });
                } else {
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

    Router.route('/logout', {
        name: 'logout',
        waitOn: function () {
            return Meteor.subscribe('status');
        },
        before: function () {
            Meteor.call('logout_user', function (error) {
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
        template: 'activities_page',
        onBeforeAction: function () {
            if (Session.get('user') === undefined) {
                Router.go('login');
            } else {
                this.next();
            }
        }
    });

    Router.route('/events', {
        name: 'events',
        template: 'events_page',
        waitOn: function () {
            return Meteor.subscribe('events');
        },
        data: function () {
            if (Session.get('user') === undefined) {
                Router.go('login');
            } else {
                return {
                    single_events: Meteor.Events.find({
                        "users.user_id": {
                            $in: [
                                Session.get('user').user_id
                            ]
                        }
                    })
                };
            }
        },
        onBeforeAction: function () {
            if (Session.get('user') === undefined) {
                Router.go('login');
            } else {
                this.next();
            }
        }
    });

    Router.route('/create/event', {
        name: 'create_event',
        template: 'create_event_page',
        waitOn: function () {
            return Meteor.subscribe('events');
        },
        onBeforeAction: function () {
            if (Session.get('user') === undefined) {
                Router.go('login');
            } else {
                this.next();
            }
        }
    });

    Router.route('/create/activity/:event_id', {
        name: 'create_activity',
        template: 'create_activity_page',
        waitOn: function () {
            Meteor.subscribe('activities');
            Meteor.subscribe('facebook_friends');
            Meteor.call('get_facebook_friends');
        },
        data: function () {
            var params = this.params;
            return {
                single_friends: Meteor.FacebookFriends.find({}, {sort: {name: 1}}),
                event_id: params.event_id
            };
        }
    });

    Router.route('/error', {
        name: 'error',
        template: 'error_page'
    });

}());