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
        }
    });

}());