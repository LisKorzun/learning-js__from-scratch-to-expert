requirejs.config({
    baseUrl: 'js/app',
    paths: {
        jquery: '../lib/jquery-3.2.1.min',
        underscore: '../lib/underscore',
        app: 'app',
        radio: 'radio',
        text: '../lib/text'
    }
});

requirejs(['app'], function (app) {
    app.init();
});