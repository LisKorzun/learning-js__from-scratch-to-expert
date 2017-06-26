define(function () {
    /**
     * Radio
     * @constructor
     */
    var Radio = function () {
        this.topics = {};
        this.oneTime = {};
    };

    /**
     * Radio methods
     * @type {{on: Radio.on, trigger: Radio.trigger, off: Radio.off, once: Radio.once}}
     */
    Radio.prototype = {

        on: function (topic, listener) {
            // create the topic if not yet created
            if (!this.topics[topic]) {
                this.topics[topic] = [];
            }

            // add the listener
            this.topics[topic].push(listener);
        },

        trigger: function (topic, data) {

            if (this.topics[topic] && this.topics[topic].length >= 1) {
                this.topics[topic].map(function (listener) {
                    listener(data);
                });
            }

            if (this.oneTime[topic] && this.oneTime[topic].length >= 1) {
                this.oneTime[topic].map(function (listener) {
                    listener(data);
                });
                this.oneTime[topic] = [];
            }
        },

        off: function (topic, listener) {

            if (!this.topics[topic]) {
                return;
            }

            var index = this.topics[topic].indexOf(listener);

            if (index === -1) {
                return;
            }

            this.topics[topic].splice(index, 1);
        },

        once: function (topic, listener) {

            if (!this.oneTime()[topic]) {
                this.oneTime[topic] = [];
            }

            // add the listener
            this.oneTime[topic].push(listener);
        }
    };

    var radio = new Radio();
    return radio;
});