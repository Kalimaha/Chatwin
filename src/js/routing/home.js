/*global Router, Meteor, Session, $*/
(function () {

    'use strict';
    Router.route('/', {
        name: 'home',
        waitOn: function () {
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
                return Router.go('events');
            }
        }
    });

}());