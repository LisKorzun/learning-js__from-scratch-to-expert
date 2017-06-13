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
            apiKey: '<API_KEY>',
            authDomain: '<PROJECT_ID>.firebaseapp.com',
            databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
            storageBucket: '<BUCKET>.appspot.com',
            messagingSenderId: '<SENDER_ID>',
        }
    }
});

requirejs(['app'], function (app) {
    app.init();
});