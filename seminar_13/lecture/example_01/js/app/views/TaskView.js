define(['underscore', 'text!templates/taskTemplate.html'],
    function (_, taskTemplate) {
        var TaskView = function (model) {
            this.model = model;
            this.template = _.template(taskTemplate);
        };

        TaskView.prototype = {

            render: function (index) {
                return this.template({index: index, message: this.model.getName()});
            }
        };

        return TaskView;
    });