define(function () {
    return {
        
        topics: {},
        
        on: function (topic, listener) {
            if (!this.topics[topic]) {
                this.topics[topic] = [];
            }

            this.topics[topic].push(listener);
        },

        trigger: function (topic, data) {
            if (!this.topics[topic] || this.topics[topic].length < 1) {
                return;
            }
            
            this.topics[topic].map(function (listener) {
                listener(data);
            });
        }
    }
});
