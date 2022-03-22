import {initializeApp} from 'firebase/app';
import {getDatabase, off, ref, set, get, onValue, onChildRemoved, onChildChanged, onChildAdded, update, remove, push} from 'firebase/database';
import moment from 'moment';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };

// const db = getDatabase(app);

// const expenses = [{
//   description: 'Gum',
//   note: '',
//   amount: 195,
//   createdAt: 0
// }, {
//   description: 'Rent',
//   note: '',
//   amount: 109500,
//   createdAt: moment(0).subtract(4, 'days').valueOf()
// }, {
//   description: 'Credit Card',
//   note: '',
//   amount: 4500,
//   createdAt: moment(0).add(4, 'days').valueOf()
// }];

// expenses.forEach((expense) => {
//   push(ref(db, 'expenses'), expense);
// });

// get(ref(db, 'expenses'))
//   .then((snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//   });

// const unsubscribe = onChildRemoved(ref(db, 'expenses'), (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// const unsubscribe = onChildChanged(ref(db, 'expenses'), (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// print alse the existing ones
// const unsubscribe = onChildAdded(ref(db, 'expenses'), (snapshot) => {
//   console.log(snapshot.key, snapshot.val());
// });

// const unsubscribe = onValue(ref(db, 'expenses'), (snapshot) => {
//   if (snapshot) {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(expenses);
//   } else {
//     console.log('No data available');
//   }
// });

// const notes = [{
//   id: '12',
//   title: 'First note',
//   body: 'This is my note'
// }, {
//   id: '12ssaas',
//   title: 'Second note',
//   body: 'This is my note'
// }];

// const notesReference = ref(db, 'notes');

// const newRef = push(notesReference);

// set(newRef, {
//   title: 'To do',
//   body: 'go for a run'
// });

// update(ref(db, "notes/-MycYDF2CgfGRxWPNKbc"), {
//   body: 'biclycle'
// });

// remove(ref(db, "notes/-MycYDF2CgfGRxWPNKbc"));

// set(ref(db), {
//   name: 'Abba cadabra',
//   age: 26,
//   stressLevel: 6,
//   job: {
//     title: 'Developer',
//     company: 'Google'
//   },
//   isSingle: true,
//   location: {
//     city: 'Phili',
//     country: 'United States'
//   }
// }).then(() => {
//   console.log('Data is saved');
// }).catch((error) => {
//   console.log('This failed.', error);
// });

// const unsubscribe = onValue(ref(db), (snapshot) => {
//   if (snapshot) {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
//   } else {
//     console.log('No data available');
//   }
// });

// get(ref(db))
//   .then((snapshot) => {
//     if (snapshot) {
//       const val = snapshot.val();
//       console.log(val);
//     } else {
//       console.log('no data available');
//     }
//   })
//   .catch((e) => {
//     console.log('Something went wron', e);
//   });

// const unsubscribe = onValue(ref(db), (snapshot) => {
//   console.log(snapshot.val());
// });

// setTimeout(() => {
//   set(ref(db, 'age'), 20);
// }, 3500);

// setTimeout(() => {
//   unsubscribe();
// }, 7000);

// setTimeout(() => {
//   set(ref(db, 'age'), 30);
// }, 10500);

// set(ref(db, 'attributes'), {
//   height: 300,
//   weight: 30
// }).then(() => {
//   console.log('Data saved #2');
// }).catch((e) => {
//   console.log('This failed. #2', e);
// });

// update(ref(db), {
//   name: 'Gino pisolino',
//   age: 87,
//   job: 'developer',
//   isSingle: null,
//   'location/city': 'Bostom' // bizare syntax
// }).then(() => { console.log('updated'); });

// remove(ref(db, 'isSingle')).then(() => {
//   console.log('field removed');
// }).catch((e) => {
//   console.log('something went wrong', e);
// });

// set(ref(db, 'isSingle'), null).then(() => { console.log( 'removed'); });

// update(ref(db), {
//   stressLevel: 9,
//   'job/company': 'Facebook',
//   'location/city': 'Seattle'
// });



