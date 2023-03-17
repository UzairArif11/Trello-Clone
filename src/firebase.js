import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// ADD FIREBASE CONFIGURATION HERE
const firebaseConfig =  {
    apiKey: "AIzaSyCEmxrP8E7sWw3jwyZjUNSM6ml2RO3A7BM",
    authDomain: "trello-51ef4.firebaseapp.com",
    projectId: "trello-51ef4",
    storageBucket: "trello-51ef4.appspot.com",
    messagingSenderId: "991132040046",
    appId: "1:991132040046:web:363ebac31c37409c69df7f",
    measurementId: "G-NV6YZCVQYG"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}