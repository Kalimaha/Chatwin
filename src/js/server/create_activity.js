/*global Meteor, Ground, HTTP*/
(function () {

    'use strict';

    Meteor.methods({
        exchange_currency: function (value, default_currency, currency) {
            console.log(value);
            console.log(default_currency);
            console.log('to');
            console.log(currency);
            var url = 'http://api.fixer.io/latest?symbols=' + default_currency + ',' + currency,
                result = HTTP.get(url),
                out;
            out = value * result.data.rates[default_currency];
            if (isNaN(out)) {
                console.log(value);
                return value;
            }
            console.log(out);
            return out;
        }
    });

}());