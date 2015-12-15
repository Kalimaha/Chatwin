/*global Template, Router, Meteor, Session, moment*/
(function () {

    'use strict';

    Template.events_page.events({
        'click #create_button': function () {
            Router.go('create_event');
        }
    });

    Template.single_event.helpers({
        format_date: function (date) {
            return moment(date).format('DD MMM YYYY');
        }
    });

}());