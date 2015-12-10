/*global Router, Meteor*/
Router.configure({
    layoutTemplate: 'footer'
});

Router.route('/', {
    name: 'home',
    before: function (pause) {
        Meteor.call('firstAccess', function (error, firstAccess) {
            if (firstAccess) {
                Router.go('/carousel');
            } else {
                Meteor.call('isLogged', function (error, isLogged) {
                    if (isLogged) {
                        Router.go('events');
                    } else {
                        Router.go('login');
                    }
                });
            }
        });
    }
});

Router.route('/login', {
    name: 'login',
    template: 'login_page',
    layoutTemplate: null
});

Router.route('/create/activity', {
    name: 'create_activity',
    template: 'create_activity_page'
});

Router.route('/activities', {
    name: 'activities',
    template: 'activities_page'
});

Router.route('/carousel', {
    name: 'carousel',
    template: 'carousel_page'
});

Router.route('/events', {
    name: 'events',
    template: 'events_page',
    waitOn: function () {
        return Meteor.subscribe('events');
    },
    data: {
        single_events: Meteor.Events.find()
    }
});

Router.route('/create/event', {
    name: 'create_event',
    template: 'create_event_page'
});

Router.route('/error', {
    name: 'error',
    template: 'error_page'
});