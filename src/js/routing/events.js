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
        data: function () {
            var user,
                user_id,
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
            }
            if (isGoogle) {
                user_id = 'google_' + user.services.google.id;
            }
            return {
                single_events: Meteor.Events.find({
                    'users': {
                        $elemMatch: {
                            user_id: user_id
                        }
                    }
                })
            };
        }
    });

}());