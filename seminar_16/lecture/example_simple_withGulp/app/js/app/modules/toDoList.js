define(['underscore', 'radio', 'fb', 'util', 'text!templates/toDoList.html'],
    function (_, radio, fb, util, toDoTpl) {
        return {
            init: function () {
                this.template = _.template(toDoTpl);
                this.el = document.querySelector('.to-do-list');

                this.setupVariables();
                this.setupEvents();
                this.render(this.tasks);
            },

            setupVariables: function () {
                this.tasks = {};
                this.currentTab = 'all';
                this.calculateSelectiveTasks();
            },

            setupEvents: function () {
                radio.on('auth/changed', this.changeAuth.bind(this));
                this.el.addEventListener('click', this.clickHandler.bind(this));
                this.el.addEventListener('keypress', this.keyHandler.bind(this), true);
            },

            render: function (tasks) {
                var user = arguments[1] || fb.getCurrentUser();
                this.calculateSelectiveTasks();
                this.el.innerHTML = this.template({
                    user: user,
                    tasks: tasks,
                    completed: this.completedCount,
                    uncompleted: this.uncompletedCount
                });
                this.selectCurrentTab();
            },

            selectCurrentTab: function () {
                var active = this.el.querySelector('.' + this.currentTab);
                if (active) {
                    active.classList.add('is-active');
                }
            },

            calculateSelectiveTasks: function () {
                this.completedCount = 0;
                this.uncompletedCount = 0;
                if (!_.isEmpty(this.tasks)) {
                    for (var id in this.tasks) {
                        if (this.tasks.hasOwnProperty(id)) {
                            if (this.tasks[id].completed) {
                                this.completedCount = ++this.completedCount;
                            } else {
                                this.uncompletedCount = ++this.uncompletedCount;
                            }
                        }
                    }
                }
            },

            changeAuth: function (user) {
                this.render(this.tasks, user);
            },

            clickHandler: function (e) {
                if (e.target.classList.contains('task-checkbox')) {
                    this.selectOrUnSelectTask(e.target);
                }
                if (e.target.classList.contains('delete')) {
                    this.deleteTask(e.target.closest('.task'));
                }
                if (e.target.classList.contains('completed')) {
                    this.currentTab = 'completed';
                    this.showSelectiveTasks(true);
                }
                if (e.target.classList.contains('uncompleted')) {
                    this.currentTab = 'uncompleted';
                    this.showSelectiveTasks(false);
                }
                if (e.target.classList.contains('all')) {
                    this.currentTab = 'all';
                    this.render(this.tasks);
                }
            },

            keyHandler: function (e) {
                if (e.target.classList.contains('add-task') && e.keyCode === 13) {
                    this.addTask(e.target.value);
                    this.el.querySelector('.add-task').focus();
                }
            },

            addTask: function (message) {
                if (message) {
                    var id = util.generateId();
                    this.tasks[id] = {
                        message: message,
                        completed: false,
                        id: id
                    };
                    this.render(this.tasks);
                }
            },

            selectOrUnSelectTask: function (taskEl) {
                var id = taskEl.closest('.task').getAttribute('data-id');
                this.tasks[id].completed = taskEl.checked;
                this.render(this.tasks);
            },

            deleteTask: function (taskEl) {
                var id = taskEl.getAttribute('data-id');
                delete this.tasks[id];
                this.render(this.tasks);
            },

            showSelectiveTasks: function (condition) {
                var tasks = {};
                for (var id in this.tasks) {
                    if (this.tasks.hasOwnProperty(id) &&
                        this.tasks[id].completed === condition
                    ) {
                        tasks[id] = this.tasks[id];
                    }
                }
                this.render(tasks);
            }
        };
    });