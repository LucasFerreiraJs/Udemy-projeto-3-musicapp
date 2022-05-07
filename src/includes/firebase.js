/* eslint-disable */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  appId: ""
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