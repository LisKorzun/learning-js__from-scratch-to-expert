requirejs.config({
    baseUrl: 'js/app',
    paths: {
        underscore: '../lib/underscore',
        text: '../lib/text',
        jquery: '../lib/jquery',
        jqueryui: '../lib/jquery-ui'
    },
    config: {
        fb: {
            apiKey: "AIzaSyADLvEowr9kCjRreklB3QVk3nVM5qWRhyU",
            authDomain: "to-do-f3bae.firebaseapp.com",
            databaseURL: "https://to-do-f3bae.firebaseio.com",
            projectId: "to-do-f3bae",
            storageBucket: "to-do-f3bae.appspot.com",
            messagingSenderId: "85961373892"
        }
    }
});

requirejs(['app'], function (app) {
    app.init();
});
