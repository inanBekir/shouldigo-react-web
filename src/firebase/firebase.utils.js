// firebase.utils.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBMR7Xanwo8Ar7aZq5TteureaPb0Ha8BFk",
    authDomain: "shouldigo-e0dd0.firebaseapp.com",
    databaseURL: "https://shouldigo-e0dd0.firebaseio.com",
    projectId: "shouldigo-e0dd0",
    storageBucket: "shouldigo-e0dd0.appspot.com",
    messagingSenderId: "105631263690",
    appId: "1:105631263690:web:4eab889c75e3b084dfbd33",
    measurementId: "G-YTMCSM9L7L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

export const auth = firebase.auth();
export const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
