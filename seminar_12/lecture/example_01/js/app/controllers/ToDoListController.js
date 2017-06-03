define(['radio', 'models/ToDoListModel', 'views/ToDoListView'],
    function (radio, ToDoListModel, ToDoListView) {
        var ToDoListController = function () {
            this.model = new ToDoListModel();
            this.view = new ToDoListView(this.model);

            this.init();
        };

        ToDoListController.prototype = {

            init: function () {
                this.setupHandlers()
                    .enable();
            },

            setupHandlers: function () {
                this.addTaskHandler = this.addTask.bind(this);
                this.taskAddedHandler = this.taskAdded.bind(this);
                this.taskSelectedHandler = this.selectTask.bind(this);
                this.unSelectTaskHandler = this.unSelectTask.bind(this);
                this.comleteTaskHandler = this.completeTask.bind(this);
                this.taskCompletedHandler = this.taskCompleted.bind(this);
                this.deleteTasksHandler = this.deleteTasks.bind(this);
                this.tasksDeletedHandler = this.tasksDeleted.bind(this);

                return this;
            },

            enable: function () {
                radio.on('task/add', this.addTaskHandler);
                radio.on('task/added', this.taskAddedHandler);
                radio.on('task/selected', this.taskSelectedHandler);
                radio.on('task/unselected', this.unSelectTaskHandler);
                radio.on('task/complete', this.comleteTaskHandler);
                radio.on('task/completed', this.taskCompletedHandler);
                radio.on('task/delete', this.deleteTasksHandler);
                radio.on('task/deleted', this.tasksDeletedHandler);

                return this;
            },

            addTask: function (name) {
                this.model.addTask(name);
            },

            taskAdded: function () {
                this.view.clearTaskTextBox();
                this.view.show();
            },

            selectTask: function (index) {
                this.model.setSelectedTask(index);
            },

            unSelectTask: function (index) {
                this.model.unSelectTask(index);
            },

            completeTask: function () {
                this.model.setTasksAsCompleted();
            },

            taskCompleted: function () {
                this.view.show();
            },

            deleteTasks: function () {
                this.model.deleteTasks();
            },

            tasksDeleted: function () {
                this.view.show();
            }
        };

        return ToDoListController;
    });