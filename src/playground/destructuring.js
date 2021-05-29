console.log("Destructuring");

// const person = {
//     name: 'Andy',
//     age: 51,
//     location: { 
//         city: 'San Diego',
//         temp: 70
//     }
// };

//Sets default as part of the destrcuturing name : <newname> for renaming
// const { name: firstname = 'Anonymous', age} = person;
// console.log(`${firstname} is ${age}.`);

// const { temp, city} = person.location;
// console.log(`It's ${temp} in ${city}`);

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName = 'Self-published'} = book.publisher;

// console.log(`Published by: ${publisherName}`);

// Destrcuturing arrays
const address = ['1299 S. Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

// empty items we dont care about, can still set a default
const [, city, state = 'New York'] = address;
console.log(`You are in ${city} ${state}.`);
