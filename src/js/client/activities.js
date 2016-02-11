/*global Template, Router, Meteor, Session, moment, $*/
(function () {

    'use strict';

    Template.activities_page.events({

        'click #back_button': function () {
            Router.go('events');
        }

    });

    Template.activities_page.rendered = function () {
        var event_id = this.data.event,
            default_currency = this.data.default_currency;
        $('#create_button').click(function () {
            Router.go('create_activity', {
                event_id: event_id,
                default_currency: default_currency
            });
        });
    };

    Template.single_activity.helpers({
        format_date: function (date) {
            var d = moment(date),
                s = '';
            s += '<span class="pull-right">';
            s += '<span style="font-size: 1rem;">';
            s += d.format('MMM');
            s += '</span><br><span style="font-size: 1.2rem; font-weight: bold;" class="text-red">';
            s += d.format('DD');
            s += '</span><br><span style="font-size: 1rem;">';
            s += d.format('YYYY');
            s += '</span>';
            s += '</span>';
            return s;
        },
        format_month: function (date) {
            return moment(date).format('MMM');
        },
        format_day: function (date) {
            return moment(date).format('DD');
        },
        format_year: function (date) {
            return moment(date).format('YYYY');
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

    Template.single_activity.rendered = function () {
        if (this.data.place !== undefined && this.data.place.id !== undefined) {
            var map = L.map('map_' + this.data.place.id).setView([this.data.place.lat, this.data.place.lon], 16);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                maxZoom: 18,
                id: 'kalimaha.p2pi707h',
                accessToken: 'pk.eyJ1Ijoia2FsaW1haGEiLCJhIjoiY2lmOXg0YXphMDA0NnRubHl5Nm9kajR6NiJ9.MOOriusg8DIuW4tFSmBQCA'
            }).addTo(map);
            L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images';
            var marker = L.marker([this.data.place.lat, this.data.place.lon]).addTo(map);
        }
    };

}());