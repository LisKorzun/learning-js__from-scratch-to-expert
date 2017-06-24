define(function () {
    return {
        generateId: function () {
            return 'id' + (new Date()).getTime();
        }
    };
});