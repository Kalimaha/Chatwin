/*global Template, Router, Meteor, Session, $*/
(function () {

    'use strict';

    Template.create_activity_page.events({

        'click #back_button': function () {
            Router.go('events');
        },

        'click .add_activity_button': function () {
            Meteor.subscribe('events');
            Meteor.call('add_activity', this.event_id, function (error, result) {
                if (error) {
                    Session.set('errorMessage', error.reason);
                    Router.go('error');
                }
            });
        }

    });

    Template.create_activity_page.rendered = function () {
        var autocomplete;
        $('#activity_date').val((new Date()).toISOString().split('T')[0]);
        try {
            autocomplete = new google.maps.places.Autocomplete(
                (document.getElementById('activity_place')), {types: ['geocode']}
            );
        } catch (e) {
            console.log(e);
        }
        $('.ui.dropdown').dropdown();
        $('.menu .item').tab();
    };

}());