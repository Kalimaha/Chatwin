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
        //,
        //onBeforeAction: function () {
        //    var u = Meteor.user();
        //    if (u === null || u.services === null) {
        //        return Router.go('login');
        //    }
        //    if (u.services === undefined || (u.services.facebook === undefined && u.services.google === undefined)) {
        //        return Router.go('login');
        //    } else {
        //        return this.next();
        //    }
        //}
    });


}());