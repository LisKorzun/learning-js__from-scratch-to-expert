define(function () {
    return {
        generateId: function () {
            return 'id' + (new Date()).getTime();
        }, 
        getFileExtension: function (fileName) {
            return /(?:\.([^.]+))?$/.exec(fileName);
        }
    };
});
