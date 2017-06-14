define(['fb', 'radio', 'controllers/menuController'],
    function (fb, radio, menu) {
        return {
            init: function () {
                fb.init();                
                menu.init();
            }
        };
    });