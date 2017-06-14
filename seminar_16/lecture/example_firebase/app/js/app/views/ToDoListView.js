define(['radio', 'underscore', 'fb', 'text!templates/toDoListTemplate.html'],
    function (radio, _, fb, toDoListTemplate) {

        var ToDoListView = function (model) {
            this.model = model;
            this.template = _.template(toDoListTemplate);
            this.el = document.querySelector('.js-container');
            this.inputSelector = '.task-text-box';

            this.init();
        };

        ToDoListView.prototype = {

            init: function () {
                this.setupHandlers()
                    .enable()
                    .show();
            },

            setupHandlers: function () {
                this.clickHandler = this.click.bind(this);

                return this;
            },

            enable: function () {
                this.el.addEventListener('click', this.clickHandler);

                return this;
            },

            click: function (e) {
                var targetClasses = e.target.className.split(' ');
                if (targetClasses.indexOf('add-task') !== -1) {
                    this.addTaskButton();
                }
                if (targetClasses.indexOf('task') !== -1) {
                    this.selectOrUnSelectTask(e.target);
                }
                if (targetClasses.indexOf('complete-task') !== -1) {
                    this.completeTaskButton();
                }
                if (targetClasses.indexOf('delete-task') !== -1) {
                    this.deleteTaskButton();
                }

            },

            addTaskButton: function () {
                if (this.el.querySelector(this.inputSelector).value) {
                    radio.trigger('task/add', this.el.querySelector(this.inputSelector).value);
                }
            },

            completeTaskButton: function () {
                radio.trigger('task/complete');
            },

            deleteTaskButton: function () {
                radio.trigger('task/delete');
            },

            selectOrUnSelectTask: function (el) {
                var taskIndex = +el.getAttribute('data-index');
                var method = el.checked ? 'task/selected' : 'task/unselected';
                radio.trigger(method, taskIndex);
            },

            show: function () {
                this.el.innerHTML = this.template({
                    tasks: this.model.getTasks(),
                    isAuth: fb.getCurrentUser()
                });
            },

            clearTaskTextBox: function () {
                this.el.querySelector(this.inputSelector).value = '';
            }
        };

        return ToDoListView;
    });