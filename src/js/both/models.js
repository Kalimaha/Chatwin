/*global Meteor, Ground*/
(function () {

    'use strict';

    Meteor.Status = new Ground.Collection('status');

    Meteor.Events = new Ground.Collection('events');

}());