define(['controllers/ToDoListController'],
    function (ToDoList) {
        return {
            init: function () {
                new ToDoList();
            }
        };
    });