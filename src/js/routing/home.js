/*global Router, Meteor, Session, $*/
(function () {

    'use strict';
    Router.route('/', {
        name: 'home',
        waitOn: function () {
            return Meteor.subscribe('getUserData');
        },
        onBeforeAction: function () {
            var user = Meteor.user();
            if (user === null || user.services === null) {
                return Router.go('login');
            }
            if (user.services.facebook === undefined && user.services.google === undefined) {
                return Router.go('login');
            } else {
                console.log(user.services);
                return Router.go('events');
            }
        }
    });

}());