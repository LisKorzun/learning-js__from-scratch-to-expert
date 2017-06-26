define(['fb', 'radio', 'modules/menu', 'modules/toDoList', 'modules/settingsManager', 'modules/errorDisplay'],
    function (fb, radio, menu, toDo, settingsManager, errorDisplay) {
        return {
            init: function () {
                fb.init();
                menu.init();
                toDo.init();
                settingsManager.init();
                errorDisplay.init();
            }
        };
    });