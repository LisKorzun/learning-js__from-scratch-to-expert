define(['underscore', 'text!templates/menu.html'],
    function (_,  menuTpl) {
        return {
            init: function () {
                this.template = _.template(menuTpl);
                this.el = document.querySelector('.menu');

                this.render();
                this.setupEvents();
            },

            render: function () {
                this.el.innerHTML = this.template();
            },


            setupEvents: function () {
               
            }
        };
    });
