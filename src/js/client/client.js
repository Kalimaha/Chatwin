/*global Template, Router, Meteor, Session, TAPi18n*/
(function () {

    'use strict';

    var get_language = function () {
        return 'it';
    };

    Meteor.startup(function () {
        Session.set('showLoadingIndicator', true);
        TAPi18n.setLanguage(get_language()).done(function () {
            Session.set('showLoadingIndicator', false);
        }).fail(function (error) {
            throw new Meteor.Error(500, error);
        });
    });

}());