Router.configure({
    layoutTemplate: 'footer'
});

Router.route('/', {
    template: 'carousel_page'
});

Router.route('/login', {
    template: 'login_page'
});

Router.route('/create/activity', {
    template: 'create_activity_page'
});