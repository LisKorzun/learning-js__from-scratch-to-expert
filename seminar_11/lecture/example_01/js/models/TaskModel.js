var TaskModel = function (name, status) {
    this.name = name;
    this.status = status || false;
    this.selected = false;
};

TaskModel.prototype = {
    
    getName: function () {
        return this.name;
    },
    
    getStatus: function () {
        return this.status;
    },

    setStatus: function (value) {
        this.status = value;
    },

    getSelected: function () {
        return this.selected;
    },

    setSelected: function (value) {
        this.selected = value;
    }
};