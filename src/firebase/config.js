import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPqMSHAShCssJzXnTTphLQQ85vW-sIFfM",
  authDomain: "educaweb3.firebaseapp.com",
  projectId: "educaweb3",
  storageBucket: "educaweb3.appspot.com",
  messagingSenderId: "609871821137",
  appId: "1:609871821137:web:dd63832815d0a03b1afb70"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };