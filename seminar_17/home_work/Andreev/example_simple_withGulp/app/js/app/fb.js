define(['module', 'firebase', 'radio', 'util'],
    function (module, firebase, radio, util) {
        return {

            init: function () {
                firebase.initializeApp(module.config());
                this.authenticated = firebase.auth().currentUser || null;

                this.setupEvents();
            },

            setupEvents: function () {

                firebase.auth().onAuthStateChanged(function (user) {

                    if (user) {

                        var refTasks = firebase.database().ref('users/' + user.uid + '/tasks/');
                        refTasks.on('value', function (snapshot) {
                            if (snapshot.val())
                            {
                                radio.trigger('value_changed', snapshot.val());
                            }
                        });

                        var refImages = firebase.database().ref('users/' + user.uid + '/images/');
                        refImages.on('value', function (snapshot) {
                            if (snapshot.val())
                            {
                                radio.trigger('images_changed', snapshot.val());
                            }
                        });

                        firebase.database().ref('/users/' + user.uid + '/background').once('value')
                            .then(function(snapshot) {

                                if (snapshot.val())
                                {
                                    this.getImageById(snapshot.val());
                                }

                            }.bind(this));

                    } else {

                    }

                    this.setCurrentUser(user);
                }.bind(this));
            },

            setCurrentUser: function (value) {
                this.authenticated = value;
                radio.trigger('auth/changed', value);
            },

            getCurrentUser: function () {
                return this.authenticated;
            },

            signInGoogle: function () {
                var provider = new firebase.auth.GoogleAuthProvider();

                firebase.auth().signInWithPopup(provider)
                    .then(function (result) {
                        var user = result.user;
                        console.log('Successfully authenticated!' + user.displayName);
                    }.bind(this))
                    .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        radio.trigger('error', error.message);
                    });
            },

            /**
             *
             */
            signOut: function () {
                firebase.auth().signOut()
                    .then(function () {
                        console.log('Successfully sign out!');
                    }.bind(this))
                    .catch(function (error) {
                        radio.trigger('error', error.message);
                    });
            },

            /**
             *
             * @param id
             * @param data
             */
            saveTask: function (id, data) {
                firebase.database().ref('users/' + this.getCurrentUser().uid + '/tasks/' + id).set(data);
            },

            /**
             *
             */
            saveFileToStorage: function (file) {

                var imagesRef = firebase.storage().ref('images');

                var id = util.generateId();

                var imageRef = imagesRef.child('img' + id.slice(2) + '.jpg');

                var uploadTask = imageRef.put(file);



                uploadTask.on('state_changed',
                    function (snapshot) {
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                        console.log('Upload is ' + progress + '% done');

                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    },
                    function (error) {
                        radio.trigger('error', error.message);
                    },
                    function () {

                        var downloadURL = uploadTask.snapshot.downloadURL;
                        var fullPath = imageRef.fullPath;

                        this.saveImage(id, {
                            downloadURL: downloadURL,
                            fullPath: fullPath
                        });

                        radio.trigger('info', 'Файл успешно загружен');
                    }.bind(this)
                );
            },

            /**
             *
             * @param id
             * @param data
             */
            saveImage: function (id, data) {
                firebase.database().ref('users/' + this.getCurrentUser().uid + '/images/' + id).set(data);
            },

            /**
             *
             * @param id
             * @param path
             */
            removeFileFromStorage: function (id, path) {

                var imageRef = firebase.storage().ref(path);

                imageRef.delete()
                    .then(function() {
                        this.removeImage(id);
                    }.bind(this))
                    .catch(function(error) {
                        radio.trigger('error', error.message);
                    });
            },

            /**
             *
             * @param id
             */
            removeImage: function (id) {
                firebase.database().ref('users/' + this.getCurrentUser().uid + '/images/' + id).remove();
            },

            /**
             *
             * @param id
             */
            setBackground: function (id) {
                firebase.database().ref('users/' + this.getCurrentUser().uid + '/background').set(id);
            },

            /**
             *
             * @param id
             * @returns {*}
             */
            getImageById: function (id) {

                firebase.database().ref('/users/' + this.getCurrentUser().uid + '/images/' + id).once('value')
                    .then(function(snapshot) {
                        radio.trigger('background_readed', {id: id, image: snapshot.val()});
                    });
            }
        }
    });