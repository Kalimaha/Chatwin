/*global Router, Meteor, Session, $*/
(function () {

    'use strict';

    Router.route('/create/activity/:event_id', {
        name: 'create_activity',
        template: 'create_activity_page',
        waitOn: function () {
            Meteor.subscribe('activities');
            Meteor.subscribe('facebook_friends');
            Meteor.subscribe('getUserData');
            Meteor.subscribe('events');
        },
        data: function () {
            var params = this.params;
            return {
                single_friends: Meteor.FacebookFriends.find({}, {sort: {name: 1}}),
                event_id: params.event_id,
                user: Meteor.user()
            };
        }
    });

}());