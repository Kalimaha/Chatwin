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
        }
    });

}());