/**
 * Diary
 * @constructor
 */
function Diary() {
    var day = [].shift.call(arguments);
    this.dayNumber = day || 1;
    this.tasks = [];
    this.selector = '.diary-wrapper';
    this.getHeading = function () {
        return 'Your events on {{dayNumber}} day:';
    };
    this.renderNext = function () {
        if (this.dayNumber < 365) {
            ++this.dayNumber;
            this.render();
        } else {
            this.showErrorMessage('You can fill only for 1-365 days in year');
        }
    };
    this.renderPrev = function () {
        if (this.dayNumber > 1) {
            --this.dayNumber;
            this.render();
        } else {
            this.showErrorMessage('You can fill only for 1-365 days in year');
        }
    };
    this.addTask = function (message) {
        if (message.length) {
            var newTask = new Task(message, this.dayNumber);
            this.tasks.push(newTask);
            this.render();
        }
    };
    this.removeTask = function (id) {
        this.tasks.map(function (task, index) {
            if (task instanceof Task && task.getId() === id) {
                this.tasks.splice(index, 1);
                this.render();
            }
        }.bind(this));
    }
}

/**
 * Setup Diary Events
 */
Diary.prototype.setupEvents = function () {
    var diary = document.querySelector(this.selector);
    diary.addEventListener('click', diaryClickHandler.bind(this));
    diary.addEventListener('blur', diaryBlurHandler.bind(this), true);
};

/**
 * Render full container with diary
 * @returns {Diary}
 */
Diary.prototype.render = function () {
    var diaryWrapper = document.querySelector(this.selector);
    diaryWrapper.innerHTML = '';
    diaryWrapper.appendChild(this.renderHeader());
    diaryWrapper.appendChild(this.renderErrorMessageBlock());
    diaryWrapper.appendChild(this.renderPanel());
    if (this.tasks.length) {
        var panel = document.querySelector('.panel');
        this.tasks.map(function (task) {
            if (task instanceof Task && task.day === this.dayNumber) {
                panel.appendChild(task.render());
            }
        }.bind(this));
    }
    return this;
};

/**
 * Render main header
 * @returns {Element}
 */
Diary.prototype.renderHeader = function () {
    var diaryHeader = document.createElement('div');
    diaryHeader.className = 'content';
    var header = document.createElement('h1');
    var headerText = document.createTextNode(this.getHeading().replace('{{dayNumber}}', this.dayNumber));
    header.appendChild(headerText);
    diaryHeader.appendChild(header);
    return diaryHeader;
};

/**
 * Render block for displaying error-messages
 * @returns {Element}
 */
Diary.prototype.renderErrorMessageBlock = function () {
    var errorMessageBlock = document.createElement('div');
    errorMessageBlock.className = 'notification is-danger error-message has-text-centered';
    return errorMessageBlock;
};

/**
 * Render panel
 * @returns {Element}
 */
Diary.prototype.renderPanel = function () {
    var diaryPanel = document.createElement('nav');
    diaryPanel.className = 'panel';
    diaryPanel.appendChild(this.renderPanelHeading());
    diaryPanel.appendChild(this.renderBlockWithInput('Add event', 'add-event'));
    return diaryPanel;
};

/**
 * Render heading of panel
 * @returns {Element}
 */
Diary.prototype.renderPanelHeading = function () {
    var diaryPanelHeading = document.createElement('div');
    diaryPanelHeading.className = 'panel-heading';
    var columnsWrapper = document.createElement('div');
    columnsWrapper.className = 'columns';
    columnsWrapper.appendChild(this.addColumn('Prev', 'prev'));
    columnsWrapper.appendChild(this.addColumn(this.dayNumber + ' day', 'has-text-centered '));
    columnsWrapper.appendChild(this.addColumn('Next', 'has-text-right next'));
    diaryPanelHeading.appendChild(columnsWrapper);
    return diaryPanelHeading;
};

/**
 * Render block of panel
 * @param innerElements
 * @returns {Element}
 */
Diary.prototype.renderPanelBlock = function (innerElements) {
    var panelBlock = document.createElement('div');
    panelBlock.className = 'panel-block';
    if (innerElements) {
        panelBlock.appendChild(innerElements);
    }
    return panelBlock;
};

/**
 * Render input
 * @param {string} placeholder
 * @param {string} cssClasses
 * @returns {Element}
 */
Diary.prototype.renderInput = function (placeholder, cssClasses) {
    var wrapper = document.createElement('p');
    wrapper.className = 'control';
    var input = document.createElement('input');
    input.className = 'input is-small ' + cssClasses || '';
    input.attributes.type = 'text';
    input.placeholder = placeholder;
    wrapper.appendChild(input);
    return wrapper;
};

/**
 * Render block with input
 * @param {string} placeholder
 * @param {string} cssClasses
 * @returns {Element}
 */
Diary.prototype.renderBlockWithInput = function (placeholder, cssClasses) {
    var block = this.renderPanelBlock();
    block.appendChild(this.renderInput(placeholder, cssClasses));
    return block;
};

/**
 * Render column
 * @param {string} text
 * @param {string} cssClasses
 * @returns {Element}
 */
Diary.prototype.addColumn = function (text, cssClasses) {
    var column = document.createElement('div');
    column.className = 'column ' + cssClasses || '';
    column.innerText = text || '';
    return column;
};

/**
 * Display error message
 * @param {string} message
 */
Diary.prototype.showErrorMessage = function (message) {
    var errorBlock = document.querySelector('.error-message');
    errorBlock.innerText = message;
    errorBlock.classList.add('show');
};

/**
 * Diary click handler
 * @param {Event} e
 */
function diaryClickHandler(e) {
    var targetClasses = e.target.className.split(' ');
    if (targetClasses.length) {
        if (targetClasses.indexOf('next') !== -1) {
            this.renderNext();
        }
        if (targetClasses.indexOf('prev') !== -1) {
            this.renderPrev();
        }
        if (targetClasses.indexOf('delete') !== -1) {
            var taskId = +e.target.closest('.task').dataset.taskId;
            if (!isNaN(taskId)) {
                this.removeTask(taskId);
            }
        }
    }
}

/**
 * Diary blur handler
 * @param {Event} e
 */
function diaryBlurHandler(e) {
    var targetClasses = e.target.className.split(' ');
    if (targetClasses.length) {
        if (targetClasses.indexOf('add-event') !== -1) {
            this.addTask(e.target.value);
        }
    }
}
