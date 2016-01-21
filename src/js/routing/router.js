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


}());