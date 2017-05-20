/**
 * Modal window
 * @param {string} selector
 * @constructor
 */
function Modal(selector) {
    this.el = document.querySelector(selector);

    if(this.el){
        this.el.addEventListener('click', clickHandler.bind(this));
    }

    /**
     * Click handler on Modal container
     * @param {Event} e
     */
    function clickHandler (e) {
        var targetClasses = e.target.className.split(' ');
        if (targetClasses.indexOf('delete') !== -1 ||
            targetClasses.indexOf('cancel') !== -1) {
            this.hide();
        }
    };

}

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
