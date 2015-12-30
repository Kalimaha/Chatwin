/*global Meteor, Ground, HTTP*/
(function () {

    'use strict';

    Meteor.methods({
        exchange_currency: function (value, default_currency, currency) {
            var url = 'http://api.fixer.io/latest?symbols=' + default_currency + ',' + currency,
                result = HTTP.get(url);
            return value * result.data.rates[default_currency];
        }
    });

}());