function List(selector) {
    if (!selector) {
        return;
    }
    this.el = document.querySelector(selector);
    this.helper = new Modal('.modal.add-task').setupEvents();
    this.tasks = [];
}
List.prototype.setupEvents = function () {
    this.el.addEventListener('click', this.clickHandler.bind(this));
    this.el.addEventListener('addTask', this.addTaskHandler.bind(this));
};

List.prototype.clickHandler = function (e) {
    var targetClasses = e.target.className.split(' ');
    if (targetClasses.indexOf('show-modal') !== -1) {
        this.helper.show();
    }
};

List.prototype.addTaskHandler = function (e) {
    if (e.detail.message) {
        //create Task
    }
};
