/*global Router, Meteor, Session, $*/
(function () {

    'use strict';
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

}());