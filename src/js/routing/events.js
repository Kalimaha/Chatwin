/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/events', {
        name: 'events',
        template: 'events_page',
        waitOn: function () {
            Meteor.subscribe('events');
            return Meteor.subscribe('getUserData');
        },
        onBeforeAction: function () {
            var u = Meteor.user();
            if (u === null || u.services === null) {
                return Router.go('login');
            }
            if (u.services === undefined || (u.services.facebook === undefined && u.services.google === undefined)) {
                return Router.go('login');
            } else {
                return this.next();
            }
        },
        data: function () {
            var user,
                user_id,
                name,
                isFacebook = false,
                isGoogle = false;
            user = Meteor.user();
            try {
                isFacebook = user.services.facebook !== undefined;
            } catch (ignore) {

            }
            try {
                isGoogle = user.services.google !== undefined;
            } catch (ignore) {

            }
            if (isFacebook) {
                user_id = 'facebook_' + user.services.facebook.id;
                name = user.services.facebook.name
            }
            if (isGoogle) {
                user_id = 'google_' + user.services.google.id;
            }
            return {
                single_events: Meteor.Events.find({
                    'users': {
                        $elemMatch: {
                            name: name
                        }
                    }
                })
            };
        }
    });

}());
