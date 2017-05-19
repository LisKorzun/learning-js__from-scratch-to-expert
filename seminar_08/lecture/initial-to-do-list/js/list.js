/**
 * TO-DO List
 * @param {string} selector
 * @constructor
 */
function List(selector) {
    this.el = document.querySelector(selector);
    this.helper = new Modal('.modal.add-task');
    this.tasks = [];
}

/**
 * Set event listeners
 */
List.prototype.setupEvents = function () {
    this.el.addEventListener('click', this.clickHandler.bind(this));
};

/**
 * Click handler on List container
 * @param {Event} e
 */
List.prototype.clickHandler = function (e) {
    var targetClasses = e.target.className.split(' ');
    if (targetClasses.indexOf('show-modal') !== -1) {
        this.helper.show();
    }
};
