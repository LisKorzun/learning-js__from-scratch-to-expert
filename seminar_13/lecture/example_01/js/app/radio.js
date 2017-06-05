define(function () {
    /**
     * Radio
     * @constructor
     */
    var Radio = function () {
        this.topics = {}
    };

    /**
     * Radio methods
     * @type {{on: Radio.on, trigger: Radio.trigger}}
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
            // return if the topic doesn't exist, or there are no listeners
            if (!this.topics[topic] || this.topics[topic].length < 1) {
                return;
            }

            // send the event to all listeners
            this.topics[topic].map(function (listener) {
                listener(data);
            });
        }
    };

    var radio = new Radio();
    return radio;
});