// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOLCPthAdr-AawmySxTqhbJt-HX6ButRc",
  authDomain: "red-burguer-fb60c.firebaseapp.com",
  projectId: "red-burguer-fb60c",
  storageBucket: "red-burguer-fb60c.appspot.com",
  messagingSenderId: "1003333842895",
  appId: "1:1003333842895:web:b13e1069759be678d504ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app)

export { storage }