Template.login_page.events({
    'click #facebook_button': function (e) {
        Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, function (e) {
            Meteor.Status.insert({
                isLogged: true,
                user_id: 'facebook_' + Meteor.user().services.facebook.id
            });
            Router.go('events');
        });
    },
    'click #google_button': function (e) {
        Meteor.loginWithGoogle({
            requestPermissions: ['email']
        }, function (e) {
            Meteor.Status.insert({
                isLogged: true,
                user_id: 'google_' + Meteor.user().services.google.id
            });
            Router.go('events');
        });
    },
    'click #twitter_button': function (e) {
        Meteor.loginWithTwitter(function (e) {
            Meteor.Status.insert({
                isLogged: true,
                user_id: 'twitter_' + Meteor.user().services.twitter.id
            });
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
    'submit form': function (event) {
        event.preventDefault();
        var event_name = event.target.event_name.value;
        console.log(event_name);
        Meteor.call('create_event', event_name, function (error, result) {
            if (error) {
                Session.set('errorMessage', error);
                Router.go('error');
            }
            Router.go('events');
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