var login = function (){
    console.log(this.name + ' is logged in');
};

var user = {
    name: 'Alesia',
    login: login
};

var secondUser = {
    name: 'Jone Doe',
    login: login
};

user.login();
secondUser.login();

// call
// user.login.call(secondUser);
//apply
// user.login.apply(secondUser);


//console.log(this); // window

// var userBound = login.bind(user);
// userBound();