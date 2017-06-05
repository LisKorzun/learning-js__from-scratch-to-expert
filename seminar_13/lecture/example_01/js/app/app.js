define(['controllers/ToDoListController'],
    function (ToDoList) {
        return {
            init: function () {
                ToDoList.initialize();
            }
        };
    });