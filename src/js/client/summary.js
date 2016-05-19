/*global Template, Router, Meteor, Session, moment, $*/
(function () {

    'use strict';

    Template.summary_page.events({

        'click #back_button': function () {
            Router.go('events');
        }

    });

    Template.summary_page.rendered = function () {
        $('#back_button').click(function () {
            Router.go('events');
        });
    };

    Template.summary_page.helpers({
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

    Template.summary_page.rendered = function () {
        var src = '/images/background4.jpg',
            body = $('body');
        // body.css('backgroundImage', 'url(' + src + ')');
        // body.css('background-repeat', 'repeat');
    };

}());
