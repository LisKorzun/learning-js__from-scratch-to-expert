define(['models/TaskModel', 'views/TaskView'],
    function (TaskModel, TaskView) {
        var TaskController = function (name) {
            this.model = new TaskModel(name);
            this.view = new TaskView(this.model);
        };

        TaskController.prototype = {

            setSelected: function (value) {
                this.model.setSelected(value);
            },

            isSelected: function () {
                return this.model.getSelected();
            },

            complete: function () {
                this.model.setStatus(true);
                this.model.setSelected(false);
            },

            getTaskElement: function (index) {
                return this.view.render(index);
            }
        };
        return TaskController;
    });