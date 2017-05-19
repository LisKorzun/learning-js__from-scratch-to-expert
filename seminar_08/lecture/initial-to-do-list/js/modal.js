/**
 * Modal window
 * @param {string} selector
 * @constructor
 */
function Modal(selector) {
    this.el = document.querySelector(selector);
    
    this.setupEvents();
}

/**
 * Set event listeners
 */
Modal.prototype.setupEvents = function () {
    this.el.addEventListener('click', this.clickHandler.bind(this));
};

/**
 * Click handler on Modal container
 * @param {Event} e
 */
Modal.prototype.clickHandler = function (e) {
    var targetClasses = e.target.className.split(' ');
    if (targetClasses.indexOf('delete') !== -1 ||
        targetClasses.indexOf('cancel') !== -1) {
        this.hide();
    }
};

/**
 * Show modal window
 */
Modal.prototype.show = function () {
    this.el.classList.add('is-active');
};

/**
 * Hide modal window
 */
Modal.prototype.hide = function () {
    this.el.classList.remove('is-active');
};
