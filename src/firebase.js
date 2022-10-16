import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_L7N1ho5UQbJsxgnEvFozo4NVrw_I82I",
  authDomain: "propert-3ffe6.firebaseapp.com",
  databaseURL: "https://propert-3ffe6-default-rtdb.firebaseio.com",
  projectId: "propert-3ffe6",
  storageBucket: "propert-3ffe6.appspot.com",
  messagingSenderId: "25288930984",
  appId: "1:25288930984:web:81703dcd4ab4700489749d",
  measurementId: "G-1VE2KYSTTN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

//Google authentication
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);

//adding documents
export const db = getFirestore(app);
export const propertiesDbRef = collection(db, "properties");

