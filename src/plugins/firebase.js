// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

// require('dotenv').config();
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // console.log(process.env);

// // Use dot env later
// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_APIKEY,
//   authDomain: process.env.VUE_APP_AUTHDOMAIN,
//   projectId: process.env.VUE_APP_PROJECTID,
//   storageBucket: process.env.VUE_APP_STORAGEBUCKET,d
//   messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
//   appId: process.env.VUE_APP_APPID,
//   measurementId: process.env.VUE_APP_MEASUREMENTID,
// };
// // Initialize Firebase

// firebase.initializeApp(firebaseConfig);
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
// firebase.getCurrentUser = () => new Promise((resolve, reject) => {
//   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//     unsubscribe();
//     resolve(user);
//   }, reject);
// });
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log('logged in', user);
//   }
// });
// // for accessing firestore database
// export const db = firebase.firestore();
