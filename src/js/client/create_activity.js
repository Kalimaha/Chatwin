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
                Meteor.create_summary();
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
        }

    });

    Meteor.create_summary = function () {
        var s = '',
            who;
        console.log($('#who_paid_tab a.active').data('tab'));
        switch ($('#who_paid_tab a.active').data('tab')) {
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
        s += who + ' paid ' + $('#activity_currency option:selected').text() + ' ' +
            parseFloat($('#activity_value').val()).toFixed(2) + ' for ' + $('#activity_title').val() +
            '. Is it correct?';
        $('#summary').html(s);
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