/*global Template, Router, Meteor, Session, $, moment, document, google*/
(function () {

    'use strict';

    Template.create_activity_page.events({

        'click #back_button': function () {
            Router.go('events');
        },

        'keyup .activity_form': function () {
            Meteor.validate_form();
        },

        'change .activity_form': function () {
            Meteor.validate_form();
        },

        'change .ui.dropdown': function () {
            $('#summary_currency').html($('.ui.dropdown.currency').dropdown('get value'));
        },

        'change #i_paid': function () {
            $('#summary_user').html(Meteor.who_paid().name);
        },

        'change #friend_paid': function () {
            $('#summary_user').html(Meteor.who_paid().name);
        },

        'change #email_paid': function () {
            $('#summary_user').html(Meteor.who_paid().name);
        },

        'change #activity_value': function () {
            $('#summary_value').html(parseFloat($('#activity_value').val()).toFixed(2));
        },

        'change #activity_title': function () {
            $('#summary_name').html($('#activity_title').val().toLowerCase());
        },

        'change #activity_date': function () {
            $('#summary_date').html($('#activity_date').val());
        },

        'keyup #email_paid': function () {
            if (Meteor.isValidEmailAddress()) {
                $('#email_paid').parent().removeClass('error');
            } else {
                $('#email_paid').parent().addClass('error');
            }
        }

    });

    Template.create_activity_footer.events({
        'click .add_activity_button': function () {
            if (typeof Meteor.isValidActivityForm() === 'object') {
                Meteor.show_warning(this.event_id);
            } else {
                Meteor.show_summary(this.event_id, this.default_currency);
            }
        }
    });

    Meteor.show_warning = function (event_id) {
        Meteor.validate_form();
        $('#modal_warning_' + event_id).modal({
            selector: {
                approve: '.actions .ok'
            },
            closable: false,
            onApprove: function () {
                return true;
            }
        }).modal('show');
    };

    Meteor.show_summary = function (event_id, default_currency) {
        $('#modal_summary_' + event_id).modal({
            selector: {
                approve  : '.actions .ok',
                deny     : '.actions .cancel'
            },
            closable: false,
            onApprove: function () {
                Meteor.save_activity(event_id, default_currency);
                return true;
            },
            onDeny: function () {
                return true;
            }
        }).modal('show');
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

    Meteor.who_paid = function () {
        var who,
            email,
            picture,
            name,
            first_name,
            last_name,
            user = Meteor.user(),
            user_id,
            selected_item_id,
            selected_item;
        switch ($('#who_paid_tab').find('a.active').data('tab')) {
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
        case 'friends':
            selected_item_id = $('.ui.dropdown.friend').dropdown('get value');
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
        case 'email':
            who = {
                name: $('#email_paid').val(),
                email: $('#email_paid').val()
            };
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

    Meteor.validate_form = function () {
        var isValidActivityForm = Meteor.isValidActivityForm(),
            i;
        if (typeof isValidActivityForm === 'object') {
            if (Array.isArray(isValidActivityForm.id)) {
                for (i = 0; i < isValidActivityForm.id.length; i += 1) {
                    $('#' + isValidActivityForm.id[i]).addClass('error');
                }
            } else {
                $('#' + isValidActivityForm.id).addClass('error');
            }
            $('.form').addClass('warning');
        } else {
            $('.form').removeClass('warning');
            $('.field').removeClass('error');
        }
    };

    Meteor.isValidEmailAddress = function () {
        var pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        return pattern.test($('#email_paid').val());
    };

    Meteor.isValidActivityForm = function () {
        var t = $('#activity_title'),
            v = $('#activity_value'),
            p1 = $('#i_paid'),
            p2 = $('#friend_paid'),
            p3 = $('#email_paid');
        if (t.val().length < 1) {
            return {
                id: 'activity_title',
                valid: false
            };
        }
        if (v.val() === undefined) {
            return {
                id: 'activity_value',
                valid: false
            };
        }
        if (isNaN((parseFloat(v.val())))) {
            return {
                id: 'activity_value',
                valid: false
            };
        }
        if (p1.is(':checked') === false && (p2.val() === undefined || p2.val().length < 1) && (p3.val() === undefined || p3.val().length < 1)) {
            return {
                id: ['i_paid', 'friend_paid', 'email_paid'],
                valid: false
            };
        }
        if ($('#who_paid_tab').find('a.active').data('tab') === 'email') {
            if (!Meteor.isValidEmailAddress()) {
                return {
                    id: 'email_paid',
                    valid: false
                };
            }
        }
        return true;
    };

    Template.create_activity_page.rendered = function () {
        $('#activity_date').val((new Date()).toISOString().split('T')[0]);
        $('#summary_date').html(moment(new Date()).format('DD MMM YYYY'));
        Meteor.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('activity_place_google')
        );
        //google.maps.event.addListener(Meteor.autocomplete, 'place_changed', function () {
        //    $('#summary_place').html(Meteor.autocomplete.getPlace().name);
        //});
        //$('.ui.dropdown').dropdown();
        //$('.menu .item').tab();
        //$('.ui.checkbox').checkbox();
        //$('#summary_currency').html($('.ui.dropdown.currency').dropdown('get value'));
        $('.js-example-basic-single').select2();
    };

}());