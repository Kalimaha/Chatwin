Template.login_page.events({
    'click #facebook_button': function (e) {
        Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, function (e) {
            Meteor.isLogged = true;
            Meteor.user_id = 'facebook_' + Meteor.user().services.facebook.id;
            Router.go('events');
        });
    },
    'click #google_button': function (e) {
        Meteor.loginWithGoogle({
            requestPermissions: ['email']
        }, function (e) {
            Meteor.isLogged = true;
            Meteor.user_id = 'google_' + Meteor.user().services.google.id;
            Router.go('events');
        });
    },
    'click #twitter_button': function (e) {
        Meteor.loginWithTwitter(function (e) {
            Meteor.isLogged = true;
            Meteor.user_id = 'twitter_' + Meteor.user().services.twitter.id;
            Router.go('events');
        });
    }
});

Template.events_page.events({
    'click #create_button': function (e) {
        Router.go('create_event');
    }
});

Template.create_event_page.events({
    'click #back_button': function (e) {
        Router.go('events');
    },
    'click #create_event_button': function (e) {
        Meteor.call('create_event', null, function (error, result) {
            if (error) {
                Session.set('errorMessage', error.message);
                Router.go('error');
            } else {
                console.log('event created');
            }
        });
    }
});

Template.error_page.helpers({
    errorMessage: function () {
        return Session.get('errorMessage');
    }
});

Template.error_page.events({
    'click #back_button': function (e) {
        Router.go('create_event');
    }
});