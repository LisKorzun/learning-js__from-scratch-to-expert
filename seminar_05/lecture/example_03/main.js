var user = {
    name: 'Alesia',
    _age: null,
    get age(){
        return this._age;
    },
    set age(value){
        this._age = value;
    }

};

console.log(Object.getOwnPropertyDescriptor(user, 'name'));
console.log(Object.getOwnPropertyDescriptor(user, 'age'));

Object.defineProperty(user, 'isAdmin', {
    value: true,
    writable: false,
    enumerable: false,
    configurable: false
});
