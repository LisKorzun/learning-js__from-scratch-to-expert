define(['underscore', 'radio', 'fb', 'util', 'text!templates/toDoList.html'],
    function (_, radio, fb, util, toDoTpl) {
        return {
            init: function (user) {
                this.template = _.template(toDoTpl);
                this.el = document.querySelector('.to-do-list');

                this.setupVariables();
                this.setupEvents();
                if (!user) {
                    this.render();
                }
            },

            setupVariables: function () {
                this.tasks = {};
                this.currentTab = null;
            },

            setupEvents: function () {
                radio.on('auth/changed', this.changeAuth.bind(this));
                radio.on('tasks/got', this.setTasks.bind(this));

                this.el.addEventListener('click', this.clickHandler.bind(this));
                this.el.addEventListener('keypress', this.keyHandler.bind(this), true);
            },

            setTasks: function (tasks) {
                this.tasks = tasks;
                this.calculateSelectiveTasks();
                this.render();
            },

            render: function () {
                var tasks = this.getCurrentTasks();
                var user = fb.getCurrentUser();
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
                var selector = this.currentTab === null ? 'all-tag' : this.currentTab ? 'completed-tag' : 'uncompleted-tag';
                var active = this.el.querySelector('.' + selector);
                if (active) {
                    active.classList.add('is-active');
                }
            },

            changeAuth: function () {
                this.tasks = {};
                this.currentTab = null;
                this.render();
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

            clickHandler: function (e) {
                if (e.target.classList.contains('task-checkbox')) {
                    this.selectOrUnSelectTask(e.target);
                }
                if (e.target.classList.contains('delete')) {
                    this.deleteTask(e.target.closest('.task'));
                }
                if (e.target.classList.contains('completed-tag')) {
                    this.currentTab = true;
                    this.render();
                }
                if (e.target.classList.contains('uncompleted-tag')) {
                    this.currentTab = false;
                    this.render();
                }
                if (e.target.classList.contains('all-tag')) {
                    this.currentTab = null;
                    this.render();
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
                    var data = {
                        message: message,
                        completed: false
                    };
                    fb.saveUserTask(id, data);
                }
            },

            deleteTask: function (taskEl) {
                var id = taskEl.getAttribute('data-id');
                fb.deleteUserTask(id);
            },

            selectOrUnSelectTask: function (taskEl) {
                var id = taskEl.closest('.task').getAttribute('data-id');
                this.tasks[id].completed = taskEl.checked;
                fb.updateUserTask(id, this.tasks[id]);
            },

            getCurrentTasks: function () {
                var condition = this.currentTab;
                if (condition === null) {
                    return this.tasks;
                } else {
                    var tasks = {};
                    for (var id in this.tasks) {
                        if (this.tasks.hasOwnProperty(id) &&
                            this.tasks[id].completed === condition
                        ) {
                            tasks[id] = this.tasks[id];
                        }
                    }
                    return tasks;
                }
            }
        };
    });
