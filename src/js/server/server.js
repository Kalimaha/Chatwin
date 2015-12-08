Meteor.methods({
    isLogged: function () {
        return Meteor.isLogged;
    },
    firstAccess: function () {
        return Meteor.firstAccess;
    }
});