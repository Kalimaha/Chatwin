/*global Template, Router, Meteor, Session, moment, $*/
(function () {

    'use strict';

    Template.events_page.events({
        'click #create_button': function () {
            Router.go('create_event');
        },
        'click .delete_event_button': function () {
            var that = this;
            $('#modal_' + this._id).modal({
                selector: {
                    approve  : '.actions .ok',
                    deny     : '.actions .cancel'
                },
                closable: false,
                onApprove: function () {
                    Meteor.call('remove_event', that._id, function (error) {
                        if (error) {
                            Session.set('errorMessage', error.reason);
                            Router.go('error');
                        } else {
                            Router.go('events');
                        }
                    });
                    return true;
                },
                onDeny: function () {
                    return true;
                }
            }).modal('show');
        },
        'click .show_activities_button': function () {
            Router.go('activities', {event_id: this._id});
        },
        'click .create_activity_button': function () {
            Router.go('create_activity', {event_id: this._id});
        }
    });

    Template.single_event.helpers({
        format_date: function (date) {
            return moment(date).format('DD MMM YYYY');
        }
    });

    Template.events_page.helpers({
        name: function () {
            return Session.get('user') !== undefined ? ' ' + Session.get('user').name : '';
        }
    });

}());