/*global Template, Router, Meteor, Session, moment, $*/
(function () {

    'use strict';

    Template.events_page.events({
        'click #create_button': function () {
            Router.go('create_event');
        },
        'click .delete_event_button': function () {
            Router.go('confirm_delete_event', {
                event_id: this._id,
                event_title: this.name
            });
        },
        'click .show_activities_button': function () {
            Router.go('activities', {
                event_id: this._id,
                default_currency: this.currency
            });
        },
        'click .create_activity_button': function () {
            Session.set('activity', null);
            Router.go('create_activity', {
                event_id: this._id,
                default_currency: this.currency
            });
        },
        'click .show_summary_button': function () {
            Router.go('summary', {
                event_id: this._id,
                default_currency: this.currency
            });
        },
        'click .show_map_button': function () {
            Router.go('map', {
                event_id: this._id
            });
        }

    });

    Template.single_event.helpers({
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

    Template.events_page.helpers({
        name: function () {
            return Session.get('user') !== undefined ? ' ' + Session.get('user').name : '';
        }
    });

    Template.events_page.rendered = function () {
        var src = '/images/ruled_tile.jpg',
            body = $('body');
        body.css('backgroundImage', 'url(' + src + ')');
        body.css('background-repeat', 'repeat');
    };

}());
