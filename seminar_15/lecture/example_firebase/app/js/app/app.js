define(['fb', 'radio', 'controllers/menuController', 'controllers/ToDoListController'],
    function (fb, radio, menu, toDoList) {
        return {
            init: function () {
                fb.init();
                
                menu.init();
                toDoList.initialize();
            }
        };
    });