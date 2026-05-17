import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "aiinterview-f0c8a.firebaseapp.com",
  projectId: "aiinterview-f0c8a",
  storageBucket: "aiinterview-f0c8a.firebasestorage.app",
  messagingSenderId: "267013744184",
  appId: "1:267013744184:web:2e447f4cb8f3f6ce72a8cd"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
