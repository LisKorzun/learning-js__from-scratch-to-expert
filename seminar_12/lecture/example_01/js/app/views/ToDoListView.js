define(['radio'], function (radio) {
    var ToDoListView = function (model) {
        this.model = model;

        this.init();
    };

    ToDoListView.prototype = {

        init: function () {
            this.createChildren()
                .setupHandlers()
                .enable();
        },

        createChildren: function () {
            this.el = document.querySelector('.js-container');
            this.taskTextBoxEl = this.el.querySelector('.task-text-box');
            this.tasksContainerEl = this.el.querySelector('.tasks-container');

            return this;
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
            if (this.taskTextBoxEl.value) {
                radio.trigger('task/add', this.taskTextBoxEl.value);
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
            this.buildList();
        },

        buildList: function () {
            this.tasksContainerEl.innerHTML = '';
            this.model.getTasks().map(function (task, index) {
                this.tasksContainerEl.appendChild(task.getTaskElement(index));
            }.bind(this));
        },

        clearTaskTextBox: function () {
            this.taskTextBoxEl.value = '';
        }
    };

    return ToDoListView;
});