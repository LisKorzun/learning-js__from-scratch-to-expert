requirejs.config({
    baseUrl: 'js/app',
    paths: {
        jquery: '/js/lib/jquery-3.2.1.min',
        app: 'app',
        radio: 'radio'
    }
});

requirejs(['app'], function (app) {
    app.init();
});