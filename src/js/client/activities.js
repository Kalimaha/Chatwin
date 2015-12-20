/*global Template, Router, Meteor, Session, moment, $*/
(function () {

    'use strict';

    Template.activities_page.events({
        'click #create_button': function () {
            console.log(this);
            if (Session.get('event_id') === undefined) {
                Session.set('errorMessage', 'Event ID is undefined');
                Router.go('error');
            } else {
                Router.go('create_activity', {event_id: Session.get('event_id')});
            }
        },
        'click back_button': function () {
            Router.go('events');
        }
    });

}());