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
                email,
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
                email = user.services.facebook.email;
            }
            if (isGoogle) {
                email = user.services.google.email;
            }
            return {
                single_events: Meteor.Events.find({
                    'users': {
                        $elemMatch: {
                            email: email
                        }
                    }
                })
            };
        }
    });

}());