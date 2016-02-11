/*global Template, Router, Meteor, Session, moment, $*/
(function () {

    'use strict';

    Template.confirm_create_activity_footer.events({
        'click #go_back_button': function () {
            Router.go('create_activity', {
                event_id: this.event_id,
                default_currency: this.default_currency
            });
        }
    });

    Template.confirm_create_activity_page.helpers({
        format_number: function (number) {
            return parseFloat(number).toFixed(2);
        },
        format_date: function (date) {
            return moment(date).format('DD MMM YYYY');
        }
    });

    Template.confirm_create_activity_page.rendered = function () {
        var event_id = this.data.event_id,
            activity = Session.get('activity');
        $('#create_activity_button').click(function () {
            Meteor.call('create_activity', event_id, activity, function (error) {
                if (error) {
                    Session.set('errorMessage', error.reason);
                    Router.go('error');
                } else {
                    Session.set('activity', null);
                    Router.go('events');
                }
            });
        });
    }

}());