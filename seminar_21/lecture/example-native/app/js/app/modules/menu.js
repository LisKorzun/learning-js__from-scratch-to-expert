define(['underscore', 'radio', 'text!templates/menu.html'],
    function (_, radio, menuTpl) {
        return {
            init: function () {
                this.template = _.template(menuTpl);
                this.$el = $('.main-menu');
                this.currentState = false;

                this.render();
                this.setupEvents();
            },

            render: function () {
                this.$el.html(this.template());
            },


            setupEvents: function () {
                this.$el.on('click', function (e) {
                    if ($(e.target).closest('.navbar-burger').length) {
                        this.toggleMenu();
                    }
                }.bind(this));
                this.$el.on('click', '.navbar-menu .navbar-item', function (e) {
                    this.toggleMenu();
                }.bind(this));
            },

            toggleMenu: function () {
                this.currentState = !this.currentState;
                this.$el.find('.navbar-burger').toggleClass('is-active', this.currentState);
                this.$el.find('.navbar-menu').toggleClass('is-active', this.currentState);
            }
        };
    });
