// non-primirtive data type: Objects are used to store collections of data & more comlex entities 
let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30, 
    address: {
        street: "123 Main st", 
        city: "New York",
        zipCode: "10001"
    }
};
console.log(person);

console.log(person.firstName);
console.log(person.address.city);

person.email = "wjattin@miami.edu";
console.log(person)

let person2 = {};
