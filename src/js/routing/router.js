/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.configure({
        layoutTemplate: 'footer',
        waitOn: function () {
            Meteor.subscribe('activities');
            Meteor.subscribe('friends');
            Meteor.subscribe('events');
            return Meteor.subscribe('getUserData');
        }
      });

}());
