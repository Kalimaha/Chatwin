Meteor.Status.allow({
    'insert': function (userId, doc) {
        return true;
    }
});

Meteor.Events.allow({
    'insert': function (userId, doc) {
        return true;
    }
});

Meteor.publish('events', function () {
    return Meteor.Events.find();
});

Meteor.publish('getUserData', function () {
    console.log(Meteor.users.find());
    return Meteor.users.find({_id: this.userId});
});

Meteor.methods({
    isLogged: function () {
        return Meteor.isLogged;
    },
    firstAccess: function () {
        return Meteor.firstAccess;
    },
    create_event: function (event_name) {
        console.log(event_name);
        var user = Meteor.Status.findOne();
        console.log(user);
        console.log(user.picture);
        if (user === undefined) {
            throw new Meteor.Error(422, 'not-authorized');
        }
        if (!user.isLogged) {
            throw new Meteor.Error(422, 'not-authorized');
        } else {
            return Meteor.Events.insert({
                name: event_name,
                creation_date: new Date(),
                owner: user.user_id,
                activities: [],
                total: 0,
                users: [
                    user
                ]
            }, function (error, result) {
                if (error) {
                    throw new Meteor.Error(500, 'Error while creating a new event.');
                }
                return result;
            });
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