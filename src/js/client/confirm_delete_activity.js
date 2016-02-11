/*global Template, Router, Meteor, Session, moment, $*/
(function () {

    'use strict';

    Template.confirm_delete_activity_footer.events({
        'click #go_back_button': function () {
            Router.go('activities', {
                event_id: this.event_id,
                default_currency: this.default_currency
            });
        },
        'click #delete_activity_button': function () {
            var that = this;
            Meteor.call('delete_activity', this.event_id, this.activity_id, this.activity_cost, function (error) {
                if (error) {
                    Session.set('errorMessage', error.reason);
                    Router.go('error');
                } else {
                    Router.go('activities', {
                        event_id: that.event_id,
                        default_currency: that.default_currency
                    });
                }
            });
        }
    });

}());