import * as firebase from 'firebase';
import moment from 'moment';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };
  
  // Initialize Firebase
  firebase.initializeApp(config);

  const database = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export { firebase, googleAuthProvider, database as default };
  
  
// This block gets all the expenses and then converts them to an array
// database.ref('expenses')
// .once('value')
// .then((snapshot) => {
//     const expenses = [];
//     snapshot.forEach( (childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });        
//     });

//     console.log(expenses);
// });



//   const onValueChange = database.ref('expenses').on('value', (snapshot) => {
//         const expenses = [];

//         snapshot.forEach( (childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val()
//             });        
//         });

//         console.log(expenses);
//   }, (e) => {
//       console.log('Error getting data', e);
//   });

//  // Look for just a single child change
//  const onValueChange = database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// }, (e) => {
//   console.log('Error getting data', e);
// });
// can also do child_added - fires twice once for all current data, and then again for all new expenses

//   database.ref('expenses').push({
//     description: 'Gum',
//     note: '',
//     amount: 195,
//     createdAt: moment(0).valueOf()
//     });

  // To add to firebase allowing it to generate a unquie ID
//   database.ref('notes').push({
//       title: 'course topics',
//       body: 'React Native, Angular, Python'
//   });

  // Get data from database AND listen for any changes
//   const onValueChange = database.ref().on('value', (snapshot) => {
//       const val = snapshot.val();
//       console.log(val);
//       console.log(val.name+' is a '+val.job.title+' at '+val.job.company);
//   }, (e) => {
//       console.log('Error getting data', e);
//   });


  // Turn listen for changes off
  // database.ref().off(onValueChange); // removes all, or once by passing in the function passed to on

  // Get all data from database one time
// database.ref()
//   .once('value')
//   .then((snapshot) => {
//       const val = snapshot.val();
//       console.log(val);
//   })
//   .catch ((e) => {
//       console.log('error occured:',e);
//   });



//   database.ref().set( {
//       name: 'Andy Farrar',
//       age: 51,
//       stressLevel: 6,
//       job: {
//           title: 'Software Developer',
//           company: 'Google'
//       },
//       location: {
//           city: 'San Diego',
//           country: 'United States'
//       }
//   }).then(() => {
//       console.log('Data is saved');
//   }).catch( (e) => {
//       console.log('This failed', e);
//   });

  // to update a single element get a ref to an element in the tree and set new value
  //database.ref('age').set(52);
  //database.ref('location/city').set('Mira Mesa');

  // If attributes doesn't exist at the top level firebase creates it the first time
//   database.ref('attributes').set( {
//         height: 75,
//         weight: 200
//   }).then(() => {
//     console.log('Uodated Data is saved');
// }).catch( (e) => {
//     console.log('This failed', e);
// });

// Update data any number of elements
// database.ref().update ( {
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// })

// Remove isSingle
// database.ref('isSingle').remove()
//     .then(() => {
//     console.log('Data was removed');
//     })
//     .catch( (e) => {
//     console.log('Removal failed', e);
// });
