/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/login', {
        name: 'login',
        template: 'login_page',
        layoutTemplate: null,
        waitOn: function () {
            Meteor.subscribe('friends');
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
        }
    });

}());