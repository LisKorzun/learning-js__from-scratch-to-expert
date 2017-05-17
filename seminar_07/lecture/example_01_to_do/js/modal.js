function Modal(selector) {
    this.el = document.querySelector(selector);
}

Modal.prototype.setupEvents = function () {
    this.el.addEventListener('click', this.clickHandler.bind(this));
    return this;
};

Modal.prototype.clickHandler = function (e) {
    var targetClasses = e.target.className.split(' ');
    if (targetClasses.indexOf('delete') !== -1 ||
        targetClasses.indexOf('cancel') !== -1) {
        this.hide();
    }
    if (targetClasses.indexOf('add-task') !== -1) {
        var data = this.getData();
        var eventAddTask = new CustomEvent('addTask', {
            detail: data,
            bubbles: true
        });
        this.el.dispatchEvent(eventAddTask);
        this.hide();
    }
};

Modal.prototype.show = function () {
    this.el.classList.add('is-active');
};

Modal.prototype.hide = function () {
    this.el.classList.remove('is-active');
    this.el.querySelector('textarea').value = '';
};

Modal.prototype.getData = function () {
    var data = {};
    data.message = this.el.querySelector('textarea').value || null;
    return data;
};