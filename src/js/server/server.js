var isLogged = false,
    firstAccess = false;

Meteor.methods({
    isLogged: function () {
        return isLogged;
    },
    firstAccess: function () {
        return firstAccess;
    }
});