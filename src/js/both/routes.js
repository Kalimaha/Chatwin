/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.configure({
        layoutTemplate: 'footer',
        onBeforeAction: function () {
            if (Meteor.loggingIn() || Meteor.userId() === undefined) {
                Router.go('login');
            } else {
                this.next();
            }
        }
    });

    Router.route('/', {
        name: 'home',
        onBeforeAction: function () {
            if (Meteor.loggingIn() || Meteor.userId() === undefined) {
                Router.go('login');
            } else {
                Router.go('events');
            }
        }
    });

    Router.route('/info', {
        name: 'info',
        template: 'info_page',
        onBeforeAction: null
    });

    Router.route('/login', {
        name: 'login',
        template: 'login_page',
        layoutTemplate: null
    });

    Router.route('/logout', {
        name: 'logout',
        onBeforeAction: function () {
            Meteor.logout();
            Router.go('login');
        }
    });

    Router.route('/logout/success', {
        name: 'logout_success',
        template: 'logout_page'
    });

    Router.route('/events', {
        name: 'events',
        template: 'events_page',
        waitOn: function () {
            return Meteor.subscribe('events');
        },
        data: function () {
            return {
                single_events: Meteor.Events.find({
                    "users._id": {
                        $in: [
                            Meteor.userId()
                        ]
                    }
                })
            };
        },
        onBeforeAction: function () {
            if (Meteor.loggingIn() || Meteor.userId() === undefined) {
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
        }
    });

    Router.route('/activities', {
        name: 'activities',
        template: 'activities_page',
        waitOn: function () {
            Meteor.subscribe('events');
        },
        data: function () {
            return {
                single_activities: Meteor.Events.find({_id: Session.get('event_id')}, {_id: 0, activities: 1})
            };
        }
    });

    Router.route('/create/activity/:event_id', {
        name: 'create_activity',
        template: 'create_activity_page',
        waitOn: function () {
            Meteor.subscribe('activities');
            Meteor.subscribe('facebook_friends');
            Meteor.subscribe('getUserData');
            Meteor.subscribe('events');
        },
        data: function () {
            var params = this.params;
            return {
                single_friends: Meteor.FacebookFriends.find({}, {sort: {name: 1}}),
                event_id: params.event_id,
                user: Meteor.user()
            };
        }
    });

    Router.route('/error', {
        name: 'error',
        template: 'error_page'
    });

}());