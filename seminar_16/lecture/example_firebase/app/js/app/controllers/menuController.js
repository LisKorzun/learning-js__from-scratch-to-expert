define(['radio', 'models/menuModel', 'views/menuView'],
    function (radio, model, View) {
        return {
            init: function () {
                this.selector = '.menu';
                this.model = model;
                this.view = new View(this.model).init();

                this.setupEvents();
            },

            show: function () {
                this.view.render();
            },

            setupEvents: function () {
                radio.on('auth/changed', this.setAuthenticated.bind(this));
            },

            setAuthenticated: function (user) {
                if (user && user.displayName){
                    this.model.setIsAuthenticated(true);
                    this.model.setFullName(user.displayName);
                } else {
                    this.model.setIsAuthenticated(false);
                }
                this.show();
            }
        };
    });