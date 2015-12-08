Template.login_page.events({
    'click #facebook_button': function (e) {
        Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, function (e) {
            console.log('facebook_' + Meteor.user().services.facebook.id);
            Meteor.isLogged = true;
            Router.go('events');
        });
    },
    'click #google_button': function (e) {
        Meteor.loginWithGoogle({
            requestPermissions: ['email']
        }, function (e) {
            console.log('google_' + Meteor.user().services.google.id);
            Meteor.isLogged = true;
            Router.go('events');
        });
    },
    'click #twitter_button': function (e) {
        Meteor.loginWithTwitter(function (e) {
            console.log('twitter_' + Meteor.user().services.twitter.id);
            Meteor.isLogged = true;
            Router.go('events');
        });
    }
});