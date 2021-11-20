import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBEdGZq0DOOdoathNbMzWiS0LUq1ph4bJI",
  authDomain: "instagram-728e2.firebaseapp.com",
  projectId: "instagram-728e2",
  storageBucket: "instagram-728e2.appspot.com",
  messagingSenderId: "558779485518",
  appId: "1:558779485518:web:69bd5b049249437a9f621f",
};

const firebase = Firebase.initializeApp(config);

console.log("firebase", firebase);

const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
