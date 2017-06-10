define(['module','firebase'], 
    function (module, firebase) {
    return{
        init: function () {
            firebase.initializeApp(module.config());
        }
    }
});