/*global Template, Router, Meteor, Session, $, moment, document, google*/
(function () {

    'use strict';

    Template.create_activity_page.events({

        'click #back_button': function () {
            Router.go('events');
        }

    });

    Template.create_activity_footer.events({
        'click .add_activity_button': function () {
            var a = {},
                place = Meteor.autocomplete.getPlace(),
                default_currency = this.default_currency,
                event_id = this.event_id;
            a.title = $('#activity_title').val();
            a.cost = $('#activity_value').val();
            a.original_cost = a.cost;
            a.currency = $('#currency').find('option:selected').val();
            a.original_currency = a.currency;
            a.place = {
                name: place !== undefined ? place.name : place,
                address: place !== undefined ? place.formatted_address : place,
                lat: place !== undefined ? place.geometry.location.lat() : place,
                lon: place !== undefined ? place.geometry.location.lng() : place,
                icon: place !== undefined ? place.icon : place
            };
            a.date = $('#activity_date').val();
            console.log(a);
            console.log(default_currency);
            Meteor.call('exchange_currency', a.cost, default_currency, a.currency, function (error, result) {
                if (error) {
                    Session.set('errorMessage', error.reason);
                }
                a.cost = result;
                a.currency = default_currency;
                Session.set('activity', a);
                Router.go('confirm_create_activity', {
                    event_id: event_id
                });
            });
            return a;
        }
    });

    Meteor.save_activity = function (event_id, default_currency) {
        var who_paid = Meteor.who_paid(),
            place = Meteor.autocomplete.getPlace(),
            currency = $('.ui.dropdown').dropdown('get value'),
            cost = parseFloat($('#activity_value').val()).toFixed(2),
            original_cost = cost,
            original_currency = currency,
            activity;
        if (Array.isArray(currency)) {
            currency = currency[1];
            original_currency = currency[1];
        }
        Meteor.call('exchange_currency', cost, default_currency, currency, function (error, result) {
            if (error) {
                Session.set('errorMessage', error.reason);
            }
            cost = result;
            activity = {
                name: $('#activity_title').val(),
                cost: cost,
                original_cost: original_cost,
                original_currency: original_currency,
                currency: default_currency,
                who_paid: who_paid,
                date: $('#activity_date').val(),
                place: {
                    name: place !== undefined ? place.name : place,
                    address: place !== undefined ? place.formatted_address : place,
                    lat: place !== undefined ? place.geometry.location.lat() : place,
                    lon: place !== undefined ? place.geometry.location.lng() : place,
                    icon: place !== undefined ? place.icon : place
                }
            };
            Meteor.Events.update(
                event_id,
                {
                    $push: {
                        activities: activity
                    },
                    $inc: {
                        total: parseFloat(cost)
                    }
                },
                function (error) {
                    if (error) {
                        Session.set('errorMessage', error.reason);
                        Router.go('error');
                    } else {
                        Meteor.call('add_user_to_event', event_id, who_paid, function (error) {
                            if (error) {
                                Session.set('errorMessage', error.reason);
                                Router.go('error');
                            } else {
                                Router.go('events');
                            }
                        });
                    }
                }
            );
        });
    };

    Template.create_activity_page.rendered = function () {
        $('#activity_date').val((new Date()).toISOString().split('T')[0]);
        $('#summary_date').html(moment(new Date()).format('DD MMM YYYY'));
        Meteor.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('activity_place_google')
        );
        $('.js-example-basic-single').select2();
    };

}());