define([], function () {
    return {
        isAuthenticated: false,
        fullName: '',
        
        setIsAuthenticated: function (value) {
            this.isAuthenticated = value;
        },
        
        getIsAuthenticated: function () {
            return this.isAuthenticated;
        },

        setFullName: function (value) {
            this.fullName = value;
        },

        getFullName: function () {
            return this.fullName;
        }
    }
});