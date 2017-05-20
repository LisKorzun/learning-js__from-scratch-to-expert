/**
 * TO-DO List
 * @param {string} selector
 * @constructor
 */
function List(selector) {
    this.el = document.querySelector(selector);
    this.helper = new Modal('.modal.add-task');
    this.tasks = [];

    setupEvents.call(this);

    /**
     * Set event listeners
     */
    function setupEvents() {
        this.el.addEventListener('click', clickHandler.bind(this));
    }

    /**
     * Click handler on List container
     * @param {Event} e
     */
    function clickHandler (e) {
        var targetClasses = e.target.className.split(' ');
        if (targetClasses.indexOf('show-modal') !== -1) {
            this.helper.show();
        }
    };
}


