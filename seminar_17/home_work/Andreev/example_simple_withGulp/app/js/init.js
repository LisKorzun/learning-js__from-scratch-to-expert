requirejs.config({
    baseUrl: 'js/app',
    paths: {
        underscore: '../lib/underscore',
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
            apiKey: "AIzaSyAml-n_cSuEruMzgZidEWNRT-3JTd06XZI",
            authDomain: "todoappe.firebaseapp.com",
            databaseURL: "https://todoappe.firebaseio.com",
            projectId: "todoappe",
            storageBucket: "todoappe.appspot.com",
            messagingSenderId: "883430117576"
        }
    }
});

requirejs(['app'], function (app) {
    app.init();
});