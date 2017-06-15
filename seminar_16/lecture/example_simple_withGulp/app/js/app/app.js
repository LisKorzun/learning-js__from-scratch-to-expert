define(['fb', 'radio', 'modules/menu', 'modules/toDoList'],
    function (fb, radio, menu, toDo) {
        return {
            init: function () {
                fb.init();
                menu.init();
                toDo.init();
            }
        };
    });