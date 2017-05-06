var User = {
    constructor: function (name, email, gender) {
        this.name = name;
        this.email = email;
        this.gender = gender;
        return this;
    },
    logIn: function () {
        console.log(this.name + ' is logged in');
    },
    logOut: function () {
        console.log(this.name + ' is logged out');
    }
};

var firstUser = Object.create(User).constructor('Lisa', 'test@test.by', 'female');


var AdminUser = Object.create(User);
AdminUser.constructor = function (name, email, gender, department) {
    User.constructor.apply(this, arguments);
    this.isAdmin = true;
    this.department = department;
    return this;
};

var admin = Object.create(AdminUser).constructor('Alex', 'admin@test.by', 'male', 'sales');
admin.logOut();




