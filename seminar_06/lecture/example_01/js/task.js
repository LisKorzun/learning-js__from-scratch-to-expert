/**
 * Task
 * @param {string} task
 * @param {number} day
 * @constructor
 */
function Task(task, day) {
    this.task = task;
    this.day = day;

    this._id = this.setId();
    this.getId = function () {
        return this._id;
    }
}

/**
 * Render block with task
 * @returns {*}
 */
Task.prototype.render = function () {
    if (this.task) {
        var block = document.createElement('div');
        block.className = 'panel-block task';
        block.dataset.taskId = this.getId();
        var textNode = document.createTextNode(this.task);
        var spanTag = document.createElement('span');
        spanTag.className = 'tag is-primary';
        spanTag.appendChild(textNode);
        spanTag.appendChild(this.renderButtonClose());
        block.appendChild(spanTag);
        return block;
    }
    return null;
};

/**
 * Render button close
 * @returns {Element}
 */
Task.prototype.renderButtonClose = function () {
    var button = document.createElement('button');
    button.className = 'delete is-small';
    return button;
};

/**
 * Generates id for tasks
 */
Task.prototype.setId = (function () {
    var counter = 0;
    return function () {
        return counter++;
    }
}());
