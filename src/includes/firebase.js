/* eslint-disable */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB1JvXoZ0fzvk9VbVZ_AQH_p_oyzSSIgIY",
  authDomain: "udemy-musicapp.firebaseapp.com",
  projectId: "udemy-musicapp",
  storageBucket: "udemy-musicapp.appspot.com",
  appId: "1:1006921706629:web:06ea8ed1e857b3646a0dec"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
// const app = initializeApp(firebaseConfig);


const usersCollections = db.collection('users')

export {
  auth,
  db,
  usersCollections
};