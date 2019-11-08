import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBeNN50nPmvO7MK_z1a0QyvBCppOUr-0o0",
  authDomain: "money-go-19fab.firebaseapp.com",
  databaseURL: "https://money-go-19fab.firebaseio.com",
  projectId: "money-go-19fab",
  storageBucket: "money-go-19fab.appspot.com",
  messagingSenderId: "1026466408548",
  appId: "1:1026466408548:web:52f98e73ae9d37e8259771",
  measurementId: "G-Z20S43YD7Y"
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');


export {firebase, googleProvider, database as default};
