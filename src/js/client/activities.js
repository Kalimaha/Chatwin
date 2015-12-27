/*global Template, Router, Meteor, Session, moment, $*/
(function () {

    'use strict';

    Template.activities_page.events({

        'click #back_button': function () {
            Router.go('events');
        },

        'click #create_button': function () {
            if (Session.get('event_id') === undefined) {
                Session.set('errorMessage', 'Event ID is undefined');
                Router.go('error');
            } else {
                Router.go('create_activity', {event_id: Session.get('event_id')});
            }
        }

    });

}());