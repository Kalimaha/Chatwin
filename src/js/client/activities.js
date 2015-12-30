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

    Template.single_activity.helpers({
        format_date: function (date) {
            return moment(date).format('DD MMM YYYY');
        },
        format_currency: function (currency) {
            switch (currency.toUpperCase()) {
            case 'EUR':
                return '&euro;';
            case 'USD':
                return '&dollar;';
            case 'GBP':
                return '&pound;';
            default:
                return currency;
            }
        },
        format_total: function (total) {
            return parseFloat(total).toFixed(2);
        }
    });

}());