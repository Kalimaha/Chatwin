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
                console.log('login 1');
                return Router.go('login');
            }
            if (u.services === undefined || (u.services.facebook === undefined && u.services.google === undefined)) {
                console.log('login 2');
                return Router.go('login');
            } else {
                console.log('events');
                return Router.go('events');
            }
        }
    });

}());