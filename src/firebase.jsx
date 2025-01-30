import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCQXTbGAk8Bw1CWFq1JVil6XSZUletuWc",
  authDomain: "najjar-88848.firebaseapp.com",
  databaseURL: "https://najjar-88848-default-rtdb.firebaseio.com",
  projectId: "najjar-88848",
  storageBucket: "najjar-88848.firebasestorage.app",
  messagingSenderId: "632206943440",
  appId: "1:632206943440:web:bff522c47bc4060ed9aad5",
  measurementId: "G-WVBCV5HFT5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
