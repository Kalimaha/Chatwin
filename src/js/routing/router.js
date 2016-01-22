/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.configure({
        layoutTemplate: 'footer'
        //,
        //waitOn: function () {
        //    return Meteor.subscribe('getUserData');
        //}
        //,
        //onBeforeAction: function () {
        //    //var user = Meteor.user();
        //    //if (user === null || user.services === null) {
        //    //    console.log('login');
        //    //    return Router.go('login');
        //    //}
        //    //if (user.services.facebook === undefined && user.services.google === undefined) {
        //    //    console.log('login 2');
        //    //    return Router.go('login');
        //    //} else {
        //    //    console.log(user.services);
        //    //    return this.next();
        //    //}
        //    //var user = Meteor.user();
        //    //if (user === null || user.services === null) {
        //    //    Router.go('login');
        //    //} else if (user.services.facebook === undefined && user.services.google === undefined) {
        //    //    Router.go('login');
        //    //} else {
        //    //    this.next();
        //    //}
        //    //if (Meteor.loggingIn() || Meteor.userId() === undefined) {
        //    //    Router.go('login');
        //    //} else {
        //    //    this.next();
        //    //}
        //}
    });


}());