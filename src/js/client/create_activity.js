/*global Template, Router, Meteor, Session, $, moment, document, google*/
(function () {

    'use strict';

    Template.create_activity_page.events({

        'click #back_button': function () {
            Router.go('events');
        },

        'keyup #activity_title': function () {
            Meteor.validate_form();
        }

    });

    Template.create_activity_footer.events({
        'click .add_activity_button': function () {
            var a = {},
                place = Meteor.autocomplete.getPlace(),
                default_currency = this.default_currency,
                event_id = this.event_id;
            if (Meteor.form_is_valid()) {
                a.title = $('#activity_title').val();
                a.cost = $('#activity_value').val();
                a.original_cost = a.cost;
                a.currency = $('#currency').find('option:selected').val();
                a.original_currency = a.currency;
                a.who_paid = Meteor.who_paid();
                a.place = {
                    name: place !== undefined ? place.name : place,
                    address: place !== undefined ? place.formatted_address : place,
                    lat: place !== undefined ? place.geometry.location.lat() : place,
                    lon: place !== undefined ? place.geometry.location.lng() : place,
                    icon: place !== undefined ? place.icon : place
                };
                a.date = $('#activity_date').val();
                Meteor.call('exchange_currency', a.cost, default_currency, a.currency, function (error, result) {
                    if (error) {
                        Session.set('errorMessage', error.reason);
                    }
                    a.cost = result;
                    a.currency = default_currency;
                    Session.set('activity', a);
                    Router.go('confirm_create_activity', {
                        event_id: event_id,
                        default_currency: default_currency
                    });
                });
            }
        }
    });

    Meteor.form_is_valid = function () {
        return Meteor.validate_form();
    };

    Meteor.validate_form = function () {
        if ($('#activity_title').val().length < 1) {
            $('.form-group.title').addClass('has-error');
            return false;
        } else {
            $('.form-group.title').removeClass('has-error');
        }
        if ($('#activity_value').val().length < 1) {
            $('.form-group.value').addClass('has-error');
            return false;
        } else {
            $('.form-group.value').removeClass('has-error');
        }
        return true;
    };

    Meteor.who_paid = function () {
        var tab = $('ul li.active a').attr('aria-controls'),
            email,
            picture,
            name,
            first_name,
            last_name,
            user = Meteor.user(),
            user_id,
            selected_item_id,
            selected_item,
            who;
        switch (tab) {
            case 'user':
                if (user.services.facebook !== undefined) {
                    user_id = 'facebook_' + user.services.facebook.id;
                    email = user.services.facebook.email;
                    name = user.services.facebook.name;
                    first_name = user.services.facebook.first_name;
                    last_name = user.services.facebook.last_name;
                    picture = 'http://graph.facebook.com/' + user.services.facebook.id + '/picture/?type=large';
                }
                if (Meteor.user().services.google !== undefined) {
                    user_id = 'google_' + user.services.google.id;
                    email = user.services.google.email;
                    name = user.services.google.name;
                    first_name = user.services.google.given_name;
                    last_name = user.services.google.family_name;
                    picture = user.services.google.picture;
                }
                break;
            case 'users':
                selected_item_id = $('#friends').find('option:selected').val();
                selected_item = Meteor.Friends.findOne({id: selected_item_id});
                email = undefined;
                name = selected_item.name;
                first_name = selected_item.name;
                last_name = selected_item.name;
                picture = selected_item.picture;
                if (user.services.facebook !== undefined) {
                    user_id = 'facebook_' + selected_item.id;
                }
                if (user.services.google !== undefined) {
                    user_id = 'google_' + selected_item.id;
                }
                break;
        }
        who = {
            user_id: user_id,
            name: name,
            first_name: first_name,
            last_name: last_name,
            picture: picture,
            email: email
        };
        return who;
    };

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
        var a = Session.get('activity');
        $('#activity_title').val(a.title || '');
        $('#activity_value').val(a.cost || 0.00);
        $('#activity_date').val(a.date || (new Date()).toISOString().split('T')[0]);
        Meteor.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('activity_place_google')
        );
        $('.js-example-basic-single').select2();
        $('#currency').select2('val', a.original_currency || 'EUR');
    };

}());