/*global Meteor, Ground, HTTP*/
(function () {

    'use strict';

    Meteor.methods({
        exchange_currency: function (value, default_currency, currency) {
            if (default_currency === currency) {
                return value;
            } else {
                var url = 'http://api.fixer.io/latest?symbols=' + default_currency + ',' + currency,
                    result = HTTP.get(url),
                    out;
                out = value * result.data.rates[default_currency];
                if (isNaN(out)) {
                    return value;
                }
                return out;
            }
        },
        create_activity: function (event_id, activity) {
            activity.id = uuid.new();
            Meteor.Events.update(
                event_id,
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
                        throw new Meteor.Error(500, 'Error while creating a new activity.');
                    }
                    Meteor.add_user_to_event(event_id, activity.who_paid, function (error, success) {
                        if (error) {
                            throw new Meteor.Error(500, 'Error while creating adding a user to the event.');
                        }
                    });
                }
            );
        }
    });

}());