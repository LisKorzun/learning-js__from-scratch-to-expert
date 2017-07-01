define (['fb', 'radio', 'underscore', 'text!templates/settingsManager.html', 'text!templates/imageContainer.html'], function(fb, radio, _, htmlStr, htmlStrImageContainer)
{
    return {

        /**
         *
         */
        init:function ()
        {
            this.el = document.querySelector('.settings-manager-container');

            this.tmpl = _.template(htmlStr);

            this.tmplImageContainer = _.template(htmlStrImageContainer);

            this.backgroundImage = '';

            this.setupHandlers();
        },

        /**
         *
         */
        setupHandlers: function ()
        {
            radio.on('auth/changed', this.userAuthChanged.bind(this));
            radio.on('images_changed', this.imagesChanged.bind(this));
            radio.on('background_readed', this.backgroundReaded.bind(this));
            radio.on('show_hide_settings', this.showHideSettingsHandler.bind(this));

            this.el.addEventListener('click', this.clickHandler.bind(this));
            this.el.addEventListener('change', this.changeHandler.bind(this));
        },

        /**
         *
         */
        changeVisible: function () {
            this.el.classList.toggle('visible');
        },

        /**
         *
         * @param user
         */
        userAuthChanged: function (user)
        {
            this.render(user);
        },

        /**
         *
         * @param images
         */
        imagesChanged: function (images)
        {
            var imagePicker = document.querySelector('.image-picker');
            imagePicker.value = '';

            var imagesContainer = document.querySelector('.images-container');
            imagesContainer.innerHTML = '';

            if (imagesContainer)
            {
                for (var i = 0; i < Object.keys(images).length; i++)
                {
                    var key = Object.keys(images)[i];
                    var obj = images[key];
                    imagesContainer.innerHTML += this.tmplImageContainer({imageSrc:obj.downloadURL, imageId:key, imagePath: obj.fullPath});
                }

            }
        },

        /**
         *
         * @param value
         */
        backgroundReaded: function (value) {
            this.setBackground(value.id, value.image.downloadURL);
        },

        /**
         *
         */
        render:function (user)
        {
            this.el.innerHTML = this.tmpl({user: user});
        },

        /**
         *
         * @param e
         */
        changeHandler: function (e)
        {
            if (e.target.classList.contains('image-picker'))
            {
                fb.saveFileToStorage(e.target.files[0]);
            }
        },

        /**
         *
         */
        showHideSettingsHandler: function ()
        {
            this.changeVisible();
        },

        /**
         *
         * @param e
         */
        clickHandler: function (e)
        {
            var target = e.target;

            if (target.classList.contains('set-image'))
            {
                var image = target.closest('figure');

                if (this.backgroundImage !== image.getAttribute('data-id'))
                {
                    this.setBackground(image.getAttribute('data-id'), image.firstElementChild.getAttribute('src'));
                    fb.setBackground(image.getAttribute('data-id'));
                }
            }

            if (target.classList.contains('delete-image'))
            {
                image = target.closest('figure');

                fb.removeFileFromStorage(image.getAttribute('data-id'), image.getAttribute('data-path'));
            }
        },

        /**
         *
         * @param id
         * @param src
         */
        setBackground: function (id, src)
        {
            var commonBackground = document.querySelector('.main-container');
            commonBackground.setAttribute('style', 'background: url(' + src + ') center center no-repeat fixed;');

            this.backgroundImage = id;
        }
    }
});