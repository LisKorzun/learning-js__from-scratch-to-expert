define(['module', 'firebase', 'radio'],
    function (module, firebase, radio) {
        return {
            init: function () {
                firebase.initializeApp(module.config());
                this.isAuthenticated = firebase.auth().currentUser || false;
            },

            setupEvents: function () {

            },

            setCurrentUser: function (value) {
                this.isAuthenticated = value;
                radio.trigger('auth/changed', value);
            },

            getCurrentUser: function () {
                return this.isAuthenticated;
            },

            signInGoogle: function () {
                var provider = new firebase.auth.GoogleAuthProvider();

                firebase.auth().signInWithPopup(provider)
                    .then(function (result) {
                        var user = result.user;
                        console.log('Successfully authenticated!' + user.displayName);
                        this.setCurrentUser(user);
                    }.bind(this))
                    .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.error(errorCode + errorMessage);
                    });
            },
            signOut: function () {
                firebase.auth().signOut()
                    .then(function () {
                        console.log('Successfully sign out!');
                        this.setCurrentUser(false);
                    }.bind(this))
                    .catch(function (error) {
                        console.error(error.message);
                    });
            }
        }
    });