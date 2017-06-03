define(['radio', 'controllers/TaskController'],
    function (radio, TaskController) {
        var ToDoListModel = function () {
            this.tasks = [];

        };

        ToDoListModel.prototype = {

            addTask: function (taskName) {
                this.tasks.push(new TaskController(taskName));
                radio.trigger('task/added');
            },

            getTasks: function () {
                return this.tasks;
            },

            setSelectedTask: function (index) {
                this.tasks[index].setSelected(true);
            },

            unSelectTask: function (index) {
                this.tasks[index].setSelected(false);
            },

            setTasksAsCompleted: function () {
                this.tasks.map(function (task) {
                    if (task.isSelected()) {
                        task.complete();
                    }
                });
                radio.trigger('task/completed');
            },

            deleteTasks: function () {
                this.tasks.map(function (task, index) {
                    if (task.isSelected()) {
                        delete this.tasks[index];
                    }
                }.bind(this));
                radio.trigger('task/deleted');
            }
        };

        return ToDoListModel;
    });