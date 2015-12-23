/*global Template, Router, Meteor, Session, $*/
(function () {

    'use strict';

    Template.create_activity_page.events({

        'click #back_button': function () {
            Router.go('events');
        },

        'click .add_activity_button': function () {
            console.log(typeof Meteor.isValidActivityForm());
            console.log(Meteor.isValidActivityForm());
            if (typeof Meteor.isValidActivityForm() === 'object') {
                Meteor.validate_form();
                $('#modal_warning_' + this.event_id).modal({
                    selector: {
                        approve: '.actions .ok'
                    },
                    closable: false,
                    onApprove: function () {
                        return true;
                    }
                }).modal('show');
            } else {
                $('#modal_summary_' + this.event_id).modal({
                    selector: {
                        approve  : '.actions .ok',
                        deny     : '.actions .cancel'
                    },
                    closable: false,
                    onApprove: function () {
                        return true;
                    },
                    onDeny: function () {
                        return true;
                    }
                }).modal('show');
            }
        },

        'keyup .activity_form': function () {
            Meteor.validate_form();
        },

        'change .activity_form': function () {
            Meteor.validate_form();
        },

        'change #activity_currency': function () {
            $('#summary_currency').html($('#activity_currency').find('option:selected').text());
        },

        'change #i_paid': function () {
            $('#summary_user').html(Meteor.who_paid());
        },

        'change #friend_paid': function () {
            $('#summary_user').html(Meteor.who_paid());
        },

        'change #email_paid': function () {
            $('#summary_user').html(Meteor.who_paid());
        },

        'change #activity_value': function () {
            $('#summary_value').html(parseFloat($('#activity_value').val()).toFixed(2));
        },

        'change #activity_title': function () {
            $('#summary_name').html($('#activity_title').val());
        },

        'keyup #email_paid': function () {
            if (Meteor.isValidEmailAddress()) {
                $('#email_paid').parent().removeClass('error');
            } else {
                $('#email_paid').parent().addClass('error');
            }
        }

    });

    Meteor.who_paid = function () {
        var who;
        switch ($('#who_paid_tab').find('a.active').data('tab')) {
        case 'user':
            who = Meteor.user().profile.name;
            break;
        case 'friends':
            who = $('.tab.active .selection .text').text().trim();
            break;
        case 'email':
            who = $('#email_paid').val();
            break;
        }
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
        if (!Meteor.isValidEmailAddress()) {
            return {
                id: 'email_paid',
                valid: false
            };
        }
        return true;
    };

    Template.create_activity_page.rendered = function () {
        var autocomplete;
        $('#activity_date').val((new Date()).toISOString().split('T')[0]);
        autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('activity_place_google')), {types: ['geocode']}
        );
        $('.ui.dropdown').dropdown();
        $('.menu .item').tab();
        $('.ui.checkbox').checkbox();
    };

}());