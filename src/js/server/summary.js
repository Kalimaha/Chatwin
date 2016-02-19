/*global Meteor, Ground, $*/
(function () {

    'use strict';

    Meteor.Summary.allow({
        'insert': function () {
            return true;
        }
    });

    Meteor.publish('summary', function () {
        return Meteor.Summary.find();
    });

    Meteor.methods({
        'create_summary': function (event, default_currency) {
            return Meteor.Summary.remove({
                event_id: event._id
            }, function (error, success) {
                if (error) {
                    throw new Meteor.Error(500, 'Error while creating a new event.');
                }
                var activities = event.activities;
                Meteor.calculate_summary(event._id, activities, default_currency);
            });
        }
    });

    Meteor.calculate_summary = function (event_id, activities, default_currency) {
        var data = activities,
            tot = 0,
            each,
            users,
            buffer = [],
            subtotals = [],
            positives = [],
            negatives = [],
            negatives_idx,
            positives_idx,
            i,
            j,
            sub;
        for (i = 0; i < data.length; i += 1) {
            tot += parseFloat(data[i].cost);
            if (Meteor.inArray(data[i].who_paid.name, buffer) < 0) {
                buffer.push(data[i].who_paid.name);
            }
        }
        users = buffer.length;
        each = tot / users;
        for (i = 0; i < buffer.length; i += 1) {
            sub = 0;
            for (j = 0; j < data.length; j += 1) {
                if (data[j].who_paid.name === buffer[i]) {
                    sub += parseFloat(data[j].cost);
                }
            }
            subtotals.push({user: buffer[i], total: sub});
        }
        for (i = 0; i < subtotals.length; i += 1) {
            subtotals[i].delta = parseFloat(subtotals[i].total - each).toFixed(2);
        }
        subtotals.sort(function (a, b) {
            return parseFloat(b.delta) - parseFloat(a.delta);
        });
        for (i = 0; i < subtotals.length; i += 1) {
            if (subtotals[i].delta > 0) {
                positives.push(subtotals[i]);
            } else {
                negatives.push(subtotals[i]);
            }
        }
        negatives_idx = negatives.length - 1;
        positives_idx = positives.length - 1;
        Meteor.owes(event_id, positives, positives_idx, negatives, negatives_idx, default_currency);
    };

    Meteor.owes = function (event_id, positives, positives_idx, negatives, negatives_idx, default_currency) {
        var n = negatives[negatives_idx],
            p = positives[positives_idx],
            d = parseFloat(p.delta) + parseFloat(n.delta);
        if (d < 0) {
            Meteor.Summary.insert({
                event_id: event_id,
                default_currency: default_currency,
                from_user: n.user,
                to_user: p.user,
                value: parseFloat(p.delta).toFixed(2)
            });
            p.delta = 0;
            n.delta = d;
            positives_idx -= 1;
            if (positives_idx >= 0) {
                return Meteor.owes(event_id, positives, positives_idx, negatives, negatives_idx, default_currency);
            }
        } else {
            Meteor.Summary.insert({
                event_id: event_id,
                default_currency: default_currency,
                from_user: n.user,
                to_user: p.user,
                value: parseFloat(-1 * n.delta).toFixed(2)
            });
            p.delta = d;
            n.delta = 0;
            negatives_idx -= 1;
            if (negatives_idx >= 0) {
                return Meteor.owes(event_id, positives, positives_idx, negatives, negatives_idx, default_currency);
            }
        }
    };

    Meteor.inArray = function(elem, array) {
        var i,
            length;
        if (array.indexOf) {
            return array.indexOf(elem);
        }
        for (i = 0, length = array.length; i < length; i += 1) {
            if (array[i] === elem ) {
                return i;
            }
        }
        return -1;
    };

}());