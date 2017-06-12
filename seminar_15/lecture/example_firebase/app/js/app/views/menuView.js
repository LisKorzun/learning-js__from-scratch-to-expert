define(['underscore', 'text!templates/menu.html', 'fb'],
    function (_, menuTpl, fb) {
        return function (model) {
            this.model = model;
            this.template = _.template(menuTpl);
            this.el = document.querySelector('.menu');

            this.init = function () {
                this.render();
                this.setupEvents();

                return this;
            };

            this.render = function () {
                this.el.innerHTML = this.template({
                    isAuth: fb.getCurrentUser()
                });
            };

            this.setupEvents = function () {
                this.el.addEventListener('click', function (e) {
                    var targetClasses = e.target.className.split(' ');
                    if (targetClasses.indexOf('google-sign-in') !== -1) {
                        fb.signInGoogle();
                    }
                    if (targetClasses.indexOf('sign-out') !== -1) {
                        fb.signOut();
                    }
                });
            }
        }
    });