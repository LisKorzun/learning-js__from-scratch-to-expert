define(['fb', 'radio', 'modules/menu', 'modules/toDoList', 'modules/userSettings'],
    function (fb, radio, menu, toDo, settings) {
        return {
            init: function () {
                radio.on('fb/initialized', function (user) {
                    this.menu.init();
                    this.settings.init();
                    this.toDo.init(user);
                }.bind({menu: menu, settings: settings, toDo: toDo}));

                fb.init();
            }
        };
    });
