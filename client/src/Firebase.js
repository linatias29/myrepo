import firebase from 'firebase';

// If you're not using Code Sandbox, never hard-code the keys! Add them in your .env file and link them here
var firebaseConfig  = {
  apiKey: "AIzaSyD_zlxlMqnpqhHQ7lwBYdGBbSLmk59ASnU",
  authDomain: "summer-camp-4bf56.firebaseapp.com",
  projectId: "summer-camp-4bf56",
  storageBucket: "summer-camp-4bf56.appspot.com",
  messagingSenderId: "956183294454",
  appId:"1:956183294454:web:a48d2cf8f95c812a3517d7"
};

// Initialize Firebase
let instance;

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = firebase.initializeApp(firebaseConfig);
    return instance;
  }

  return null;
}