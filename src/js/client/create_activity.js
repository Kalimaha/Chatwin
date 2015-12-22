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
        }

    });

    Template.create_activity_page.helpers({
        'summary': function () {
            return 'summary';
        }
    });

    Meteor.validate_form = function () {
        var isValidActivityForm = Meteor.isValidActivityForm();
        if (typeof isValidActivityForm === 'object') {
            $('#' + isValidActivityForm.id).addClass('error');
            $('.form').addClass('warning');
        } else {
            $('.form').removeClass('warning');
            $('.field').removeClass('error');
        }
    };

    Meteor.isValidActivityForm = function () {
        var t = $('#activity_title'),
            v = $('#activity_value');
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
        return true;
    };

    Template.create_activity_page.rendered = function () {
        var autocomplete;
        $('#activity_date').val((new Date()).toISOString().split('T')[0]);
        try {
            autocomplete = new google.maps.places.Autocomplete(
                (document.getElementById('activity_place_google')), {types: ['geocode']}
            );
        } catch (e) {
            console.log(e);
        }
        $('.ui.dropdown').dropdown();
        $('.menu .item').tab();
    };

}());