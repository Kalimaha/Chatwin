/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/logout', {
        name: 'logout',
        onBeforeAction: function () {
            Meteor.logout();
            Router.go('login');
        }
    });

    Router.route('/logout/success', {
        name: 'logout_success',
        template: 'logout_page'
    });

}());