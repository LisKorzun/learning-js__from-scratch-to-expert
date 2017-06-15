define(['underscore', 'radio', 'fb', 'text!templates/menu.html'],
    function (_, radio, fb, menuTpl) {
        return {
            init: function () {
                this.template = _.template(menuTpl);
                this.el = document.querySelector('.menu');

                this.render();
                this.setupEvents();
            },

            render: function () {
                var user = arguments[0] || fb.getCurrentUser();
                this.el.innerHTML = this.template({
                    user: user
                });
            },

            setupEvents: function () {
                radio.on('auth/changed', this.changeAuth.bind(this));

                this.el.addEventListener('click', function (e) {
                    var targetClasses = e.target.className.split(' ');
                    if (targetClasses.indexOf('google-sign-in') !== -1) {
                        fb.signInGoogle();
                    }
                    if (targetClasses.indexOf('sign-out') !== -1) {
                        fb.signOut();
                    }
                });
            },

            changeAuth: function (user) {
                this.render(user);
            }
        };
    });