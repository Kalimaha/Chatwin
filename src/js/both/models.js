/*global Meteor, Ground*/
(function () {

    'use strict';

    Meteor.Status = new Ground.Collection('status');

    Meteor.Events = new Ground.Collection('events');

    Meteor.Activities = new Ground.Collection('activities');

    Meteor.Friends = new Ground.Collection('friends');

    Ground.Collection(Meteor.users);

}());