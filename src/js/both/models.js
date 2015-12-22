/*global Meteor, Ground*/
(function () {

    'use strict';

    Meteor.Status = new Ground.Collection('status');

    Meteor.Events = new Ground.Collection('events');

    Meteor.Activities = new Ground.Collection('activities');

    Meteor.FacebookFriends = new Ground.Collection('facebook_friends');

    Ground.Collection(Meteor.users);

}());