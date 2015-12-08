Meteor.methods({
    isLogged: function () {
        return Meteor.isLogged;
    },
    firstAccess: function () {
        return Meteor.firstAccess;
    }
});

ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '500745063418802',
    secret: '95a0b7cadc7006182c1f951bc8364637'
});