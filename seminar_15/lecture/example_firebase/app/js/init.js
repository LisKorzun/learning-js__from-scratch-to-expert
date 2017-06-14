requirejs.config({
    baseUrl: 'js/app',
    paths: {
        jquery: '../lib/jquery-3.2.1.min',
        underscore: '../lib/underscore',
        app: 'app',
        radio: 'radio',
        text: '../lib/text',
        firebase: 'https://www.gstatic.com/firebasejs/4.1.1/firebase'
    },
    shim: {
        firebase: {
            exports: 'firebase'
        }
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