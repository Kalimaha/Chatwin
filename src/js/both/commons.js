Router.configure({
    layoutTemplate: 'footer'
});

Router.route('/', {
    name: 'carousel',
    template: 'carousel_page'
});

Router.route('/login', {
    name: 'login',
    template: 'login_page'
});

Router.route('/create/activity', {
    name: 'create_activity',
    template: 'create_activity_page'
});