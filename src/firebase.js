import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


// import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
    // apiKey: "AIzaSyDfPR2Dm8YLtUrsA7hMkqdly1YxfHrwZcY",
    // authDomain: "studystream-6a108.firebaseapp.com",
    // projectId: "studystream-6a108",
    // storageBucket: "studystream-6a108.appspot.com",
    // messagingSenderId: "333612985070",
    // appId: "1:333612985070:web:2c87dcd213cd79c08721ff"

    apiKey: "AIzaSyDgxRohGAXIo6I9l7lY20wW9QAnTUPLGBc",
    authDomain: "chatlive-20743.firebaseapp.com",
    projectId: "chatlive-20743",
    storageBucket: "chatlive-20743.appspot.com",
    messagingSenderId: "975152726702",
    appId: "1:975152726702:web:3f7d6e55b5bb90adba633f"
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = getStorage();
export const db = firebase.firestore();


// auth.useEmulator('http://localhost:9099');

// if(window.location.hostname === 'localhost'){
//   db.useEmulator('localhost', '8080');
// }

export default firebase;
