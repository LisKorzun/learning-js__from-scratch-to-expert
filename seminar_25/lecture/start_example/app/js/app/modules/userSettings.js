define(['underscore', 'fb', 'radio', 'text!templates/userSettings.html'],
    function (_, fb, radio, settingsTpl) {
        return {
            init: function () {
                this.template = _.template(settingsTpl);
                this.el = document.querySelector('.user-settings');

                this.setupVariables();
                this.render();
                this.setupEvents();
            },

            setupVariables: function () {
                this.state = false;
                this.images = [];
                this.currentBackground = {
                    url: null,
                    id: null
                }
            },

            render: function () {
                this.el.innerHTML = this.template({
                    images: this.images,
                    user: fb.getCurrentUser()
                });
            },

            setupEvents: function () {
                radio.on('settingsImages/got', this.updateImages.bind(this));
                radio.on('auth/changed', this.updateUser.bind(this));
                radio.on('currentImage/changed', this.updateCurrentBackground.bind(this));

                this.el.addEventListener('click', this.clickHandler.bind(this));
                this.el.addEventListener('change', this.fileChangeHandler);
            },

            clickHandler: function (e) {
                if (e.target.classList.contains('show-hide-button')) {
                    this.changeState();
                }
                if (e.target.classList.contains('set-background')) {
                    this.setBackground(e.target.closest('figure'));
                }
                if (e.target.classList.contains('delete')) {
                    var id = e.target.closest('figure').getAttribute('data-id');
                    var path = e.target.closest('figure').getAttribute('data-path');
                    this.checkCurrentBackground(id);
                    fb.deleteRefOnFile(id, path);
                }
            },

            checkCurrentBackground: function (id) {
                if (this.currentBackground.id == id) {
                    fb.saveCurrentBackgroundSettings({url: null, id: null})
                }
            },

            fileChangeHandler: function (e) {
                if (e.target.id === 'input-files') {
                    var files = e.target.files;
                    var fileList = [];
                    for (var i = 0; i < files.length; i++) {
                        fileList.push(files[i]);
                        fb.saveFile(files[i]);
                    }
                }
            },

            fileUploadedHandler: function (fileMeta) {
                fb.saveRefOnFile(fileMeta);
            },

            setBackground: function (el) {
                var bg = 'url("' + el.querySelector('img').getAttribute('src') + '") no-repeat center center fixed';
                var id = el.getAttribute('data-id');

                this.currentBackground.url = bg;
                this.currentBackground.id = id;

                fb.saveCurrentBackgroundSettings({url: bg, id: id});
                document.querySelector('.section').style.background = bg;
            },

            updateImages: function (images) {
                this.images = images || [];
                this.render();
            },

            updateUser: function (user) {
                if (user === null) {
                    document.querySelector('.section').style.background = '';
                }
                this.render();
            },

            updateCurrentBackground: function (settings) {
                if (settings && settings.id && settings.url) {
                    document.querySelector('.section').style.background = settings.url;
                } else {
                    document.querySelector('.section').style.background = '';
                }
            },

            changeState: function () {
                this.state = !this.state;
                this.el.classList.toggle('active', this.state);
                this.el.querySelector('.show-hide-button').innerText = this.state ? 'Hide settings' : 'Show settings';
            }
        };
    });