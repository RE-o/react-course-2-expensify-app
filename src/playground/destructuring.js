// Object destructuring
//
// const person = {
//   name: 'Andrew',
//   age: 26,
//   location: {
//     city: 'Philadelphia',
//     temp: 32
//   }
// }

// const { name: firstName = 'Anonymous', age } = person;

// console.log(`${firstName} is ${age}.`);

// const {city, temp: temperature} = person.location;

// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}`);
// }

// const book = {
//   title: 'Ego is the enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//   }
// };

// const { name: publisherName = 'Self-published' } = book.publisher;

// console.log(publisherName); // Penguine, selfpublished

// Array destructuring
// const address = ['1299 S Juniper Street', 'Philadelphia', 'State', 'Zip code'];
const address = [];

const [, , stateName = 'New York'] = address;

console.log(`You are in ${stateName}.`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [beverage, , mediumSize, ] = item;

console.log(`A ${beverage} costs ${mediumSize}`);
