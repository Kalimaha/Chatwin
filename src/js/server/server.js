Meteor.methods({
    isLogged: function () {
        return Meteor.isLogged;
    },
    firstAccess: function () {
        return Meteor.firstAccess;
    },
    create_event: function (event) {
        console.log(Meteor.user_id);
        if (Meteor.user_id === undefined) {
            console.log('throw error');
            throw new Meteor.Error(422, 'not-authorized');
        }
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

ServiceConfiguration.configurations.remove({
    service: 'google'
});

ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: '180911211010-41k7kj1fgt34jmsu11o1ru3j4g7hs6vj.apps.googleusercontent.com',
    secret: 'ffbqLZlXiqWp_TlFPq1ENYvn'
});

ServiceConfiguration.configurations.remove({
    service: 'twitter'
});

ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: '44Y47H3ORHRNEHHyo91iVr31i',
    secret: 'TBeMwQxDcccKTLyHPWvLFbmRaoOqUx00Cq4xyVKGekLL4seOrD'
});