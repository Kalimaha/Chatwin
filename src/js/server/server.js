/*global ServiceConfiguration, Meteor*/
(function () {

    'use strict';

    Meteor.publish('getUserData', function () {
        return Meteor.users.find({_id: this.userId});
    });

    ServiceConfiguration.configurations.remove({
        service: 'facebook'
    });

    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        /* Production Account. */
        //appId: '500745063418802',
        //secret: '95a0b7cadc7006182c1f951bc8364637'
        /* Test Account. */
        appId: '515104685316173',
        secret: '668bbfeb51693fdccd82b56db1714b01'
    });

    ServiceConfiguration.configurations.remove({
        service: 'google'
    });

    ServiceConfiguration.configurations.insert({
        service: 'google',
        clientId: '180911211010-41k7kj1fgt34jmsu11o1ru3j4g7hs6vj.apps.googleusercontent.com',
        secret: 'ffbqLZlXiqWp_TlFPq1ENYvn'
    });

}());