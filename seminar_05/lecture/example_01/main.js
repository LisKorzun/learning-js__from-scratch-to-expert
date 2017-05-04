var login = function () {
    // this - это тот объект (scope, context), 
    // у которого вызвана функция
    alert(this.name + ' is logged in');
};

var user = {
    name: 'Alesia',
    email: 'lis@gmail.com',
    gender: 'female',
    login: login
};

user.login(); // Alesia is logged in

var secondUser = {
    name: 'Jone Doe',
    login: login
};
secondUser.login(); // Jone Doe is logged in