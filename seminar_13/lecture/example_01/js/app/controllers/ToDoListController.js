define(['radio', 'models/ToDoListModel', 'views/ToDoListView'],
    function (radio, ToDoListModel, ToDoListView) {
        return {
            initialize: function () {
                this.model = new ToDoListModel();
                this.view = new ToDoListView(this.model);

                this._setupHandlers()._enable();
            },

            _setupHandlers: function () {
                this.addTaskHandler = this._addTask.bind(this);
                this.taskAddedHandler = this._taskAdded.bind(this);
                this.taskSelectedHandler = this._selectTask.bind(this);
                this.unSelectTaskHandler = this._unSelectTask.bind(this);
                this.comleteTaskHandler = this._completeTask.bind(this);
                this.taskCompletedHandler = this._taskCompleted.bind(this);
                this.deleteTasksHandler = this._deleteTasks.bind(this);
                this.tasksDeletedHandler = this._tasksDeleted.bind(this);

                return this;
            },

            _enable: function () {
                radio.on('task/add', this.addTaskHandler);
                radio.on('task/added', this.taskAddedHandler);
                radio.on('task/selected', this.taskSelectedHandler);
                radio.on('task/unselected', this.unSelectTaskHandler);
                radio.on('task/complete', this.comleteTaskHandler);
                radio.on('task/completed', this.taskCompletedHandler);
                radio.on('task/delete', this.deleteTasksHandler);
                radio.on('task/deleted', this.tasksDeletedHandler);
            },

            _addTask: function (name) {
                this.model.addTask(name);
            },

            _taskAdded: function () {
                this.view.clearTaskTextBox();
                this.view.show();
            },

            _selectTask: function (index) {
                this.model.setSelectedTask(index);
            },

            _unSelectTask: function (index) {
                this.model.unSelectTask(index);
            },

            _completeTask: function () {
                this.model.setTasksAsCompleted();
            },

            _taskCompleted: function () {
                this.view.show();
            },

            _deleteTasks: function () {
                this.model.deleteTasks();
            },

            _tasksDeleted: function () {
                this.view.show();
            }
        };
    });