import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDA5heF728Az5VCIvuEUcTOSwo6y7nZ4GQ",
  authDomain: "react-mini-blog-ff4b2.firebaseapp.com",
  projectId: "react-mini-blog-ff4b2",
  storageBucket: "react-mini-blog-ff4b2.appspot.com",
  messagingSenderId: "714133201407",
  appId: "1:714133201407:web:ac395a63a6e618dce987ca"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };