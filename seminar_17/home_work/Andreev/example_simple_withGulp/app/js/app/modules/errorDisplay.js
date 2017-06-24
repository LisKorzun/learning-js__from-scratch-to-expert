define (['radio', 'underscore', 'text!templates/errorDisplay.html'], function(radio, _, htmlStr) {

    return {

        /**
         * 
         */
        init:function () {

            this.el = document.querySelector('.errors-display-panel');

            this.tmpl = _.template(htmlStr);

            this.setupHandlers();
        },

        /**
         * 
         */
        setupHandlers: function () {

            this.el.addEventListener('click', this.clickHandler.bind(this));

            this.errorMessageHandler = this.errorHandler.bind(this);
            this.warningMessageHandler = this.warningHandler.bind(this);
            this.infoMessageHandler = this.infoHandler.bind(this);

            radio.on('error', this.errorMessageHandler);
            radio.on('warning', this.warningMessageHandler);
            radio.on('info', this.infoMessageHandler);
        },

        /**
         * 
         */
        errorHandler: function (message) {
            this.el.innerHTML = this.tmpl({message: message, color: 'is-danger'});
        },

        /**
         *
         */
        warningHandler: function (message) {
            this.el.innerHTML = this.tmpl({message: message, color: 'is-danger'});
        },

        /**
         *
         */
        infoHandler: function (message) {
            console.log(message);
            this.el.innerHTML = this.tmpl({message: message, color: 'is-info'});
        },

        /**
         *
         * @param e
         */
        clickHandler: function (e) {
            if (e.target.classList.contains('delete'))
            {
                this.el.innerHTML = '';
            }
        }
    }
});