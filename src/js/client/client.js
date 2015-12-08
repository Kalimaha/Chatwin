Template.login_page.events({
    'click #facebook_button': function (e) {
        Meteor.loginWithFacebook({
            requestPermissions: ['email']
        }, function (e) {
            console.log(Meteor.user().services.facebook.name);
            console.log(Meteor.user().services.facebook.email);
            Meteor.isLogged = true;
            Router.go('events');
        });
    }
});