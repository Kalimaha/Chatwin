/*global Template, Router, Meteor, Session, moment, $*/
(function () {

    'use strict';

    Template.confirm_create_activity_footer.events({
        'click #go_back_button': function () {
            Router.go('create_activity', {
                event_id: this.event_id,
                default_currency: this.default_currency
            });
        },
        'click #create_activity_button': function () {
            var activity = Session.get('activity'),
                event_id = this.event_id;
            Meteor.Events.update(
                this.event_id,
                {
                    $push: {
                        activities: activity
                    },
                    $inc: {
                        total: parseFloat(activity.cost)
                    }
                },
                function (error) {
                    if (error) {
                        Session.set('errorMessage', error.reason);
                        Router.go('error');
                    } else {
                        Meteor.call('add_user_to_event', event_id, activity.who_paid, function (error) {
                            if (error) {
                                Session.set('errorMessage', error.reason);
                                Router.go('error');
                            } else {
                                Session.set('activity', null);
                                Router.go('events');
                            }
                        });
                    }
                }
            );
        }
    });

    Template.confirm_create_activity_page.helpers({
        format_number: function (number) {
            return parseFloat(number).toFixed(2);
        },
        format_date: function (date) {
            return moment(date).format('DD MMM YYYY');
        }
    });

}());