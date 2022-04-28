/* eslint-disable */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

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
const storage = firebase.storage();
// const app = initializeApp(firebaseConfig);

const usersCollections = db.collection('users');
const songsCollections = db.collection('songs');
const commentsCollections = db.collection('comments');

export {
  auth,
  db,
  songsCollections,
  usersCollections,
  commentsCollections,
  storage,
};