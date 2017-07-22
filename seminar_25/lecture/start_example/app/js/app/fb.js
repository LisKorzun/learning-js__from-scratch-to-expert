define(['module', 'firebase', 'radio', 'util'],
    function (module, firebase, radio, util) {
        return {
            /**
             * Initializes firebase
             */
            init: function () {
                firebase.initializeApp(module.config());

                this.setupVariables();
                this.setupEvents();
            },

            /**
             * Sets up essential variables
             */
            setupVariables: function () {
                this.authenticated = firebase.auth().currentUser || null;
                this.initialized = false;
            },

            /**
             * Sets up essential events
             */
            setupEvents: function () {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        this.setCurrentUser(user);
                        this.setupListeners();
                    } else {
                        this.setCurrentUser(null);
                    }
                    if (!this.initialized) {
                        this.initialized = true;
                        radio.trigger('fb/initialized', user);
                    }
                }.bind(this));
            },

            /**
             * Sets up firebase listeners
             */
            setupListeners: function () {
                this.listenTasks();
                this.listenCurrentBackgroundSettings();
                this.listenImagesSettings();
            },

            /**
             * Sets current user
             * @param {Object|null} value
             */
            setCurrentUser: function (value) {
                this.authenticated = value;
                radio.trigger('auth/changed', value);
            },

            /**
             * Returns current user
             * @returns {Object|null}
             */
            getCurrentUser: function () {
                return this.authenticated;
            },

            /**
             * Signs in with Google
             */
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
                        console.error(errorCode + errorMessage);
                    });
            },

            /**
             * Signs out
             */
            signOut: function () {
                firebase.auth().signOut()
                    .then(function () {
                        console.log('Successfully sign out!');
                    }.bind(this))
                    .catch(function (error) {
                        console.warn(error.message);
                    });
            },

            /**
             * Saves user task in DB
             * @param {string} id - Task id
             * @param {Object} data
             * @param {string} data.message - User task or event
             * @param {boolean} data.completed - Completed or not
             */
            saveUserTask: function (id, data) {
                firebase.database().ref('users/' + this.authenticated.uid + '/tasks/' + id).set(data);
            },

            /**
             * Updates user task in DB
             * @param {string} id - Task id
             * @param {Object} data
             * @param {string} data.message - User task or event
             * @param {boolean} data.completed - Completed or not
             */
            updateUserTask: function (id, data) {
                var ref = firebase.database().ref('/users/' + this.authenticated.uid + '/tasks/' + id);
                ref.update(data);
            },

            /**
             * Deletes user task from DB
             * @param {string} id - Task id
             */
            deleteUserTask: function (id) {
                var ref = firebase.database().ref('/users/' + this.authenticated.uid + '/tasks/' + id);
                ref.remove();
            },

            /**
             * Listens changes of the user's tasks
             */
            listenTasks: function () {
                firebase.database().ref('/users/' + this.authenticated.uid + '/tasks').on('value', function (snapshot) {
                    radio.trigger('tasks/got', snapshot.val());
                });
            },

            /**
             * Saves file in storage
             * @param {File} file
             */
            saveFile: function (file) {
                var id = util.generateId();
                var fileName = id + util.getFileExtension(file.name)[0];
                var metadata = {
                    contentType: file.type,
                    customMetadata: {
                        id: id
                    }
                };
                var uploadTask = firebase.storage().ref('images/' + fileName).put(file, metadata);
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    this.uploadingFileProgressHandler,
                    this.uploadingFileErrorHandler,
                    this.uploadingFileSuccessHandler.bind({fb: this, uploadTask: uploadTask}));
            },

            /**
             * Progress handler of file uploading
             * @param {Object} snapshot
             */
            uploadingFileProgressHandler: function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },

            /**
             * Error handler of file uploading
             * @param {Object} error
             */
            uploadingFileErrorHandler: function (error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            },

            /**
             * Success handler of file uploading
             */
            uploadingFileSuccessHandler: function () {
                var fileData = {
                    downloadURL: this.uploadTask.snapshot.downloadURL,
                    fullPath: this.uploadTask.snapshot.metadata.fullPath
                };
                this.fb.saveRefOnFile(this.uploadTask.snapshot.metadata.customMetadata.id, fileData);
            },

            /**
             * Saves information about image in DB
             * @param {string} id - Image id
             * @param {Object} fileData
             * @param {string} fileData.downloadURL - Download url in storage
             * @param {string} fileData.fullPath - Reference for image in storage
             */
            saveRefOnFile: function (id, fileData) {
                firebase.database().ref('users/' + this.getCurrentUser().uid + '/settings/images/' + id).set(fileData);
            },

            /**
             * Deletes image from storage and reference in DB
             * @param {string} id
             * @param {string} path
             */
            deleteRefOnFile: function (id, path) {
                firebase.storage().ref(path).delete()
                    .then(function () {

                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
                var ref = firebase.database().ref('users/' + this.getCurrentUser().uid + '/settings/images/' + id);
                ref.remove();
            },

            /**
             * Listens changes of images in DB
             */
            listenImagesSettings: function () {
                firebase.database().ref('/users/' + this.authenticated.uid + '/settings/images/').on('value', function (snapshot) {
                    radio.trigger('settingsImages/got', snapshot.val());
                });
            },

            /**
             * Saves current background in DB
             * @param {Object} data
             * @param {string} data.url - Url in format for css
             * @param {string} data.id - Image id
             */
            saveCurrentBackgroundSettings: function (data) {
                firebase.database().ref('users/' + this.getCurrentUser().uid + '/settings/current').set(data);
            },

            /**
             * Listens changes of current background in DB
             */
            listenCurrentBackgroundSettings: function () {
                firebase.database().ref('/users/' + this.authenticated.uid + '/settings/current/').on('value', function (snapshot) {
                    radio.trigger('currentImage/changed', snapshot.val());
                });
            }
        }
    });
