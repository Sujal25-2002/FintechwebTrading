import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCB_0LqgZnkjMyvlS-ZSvZlk0cBgHDzs04",
  authDomain: "finwebtrading-ed6d7.firebaseapp.com",
  projectId: "finwebtrading-ed6d7",
  storageBucket: "finwebtrading-ed6d7.firebasestorage.app",
  messagingSenderId: "459128909383",
  appId: "1:459128909383:web:c094f0e24d7fb7a4298b62",
  measurementId: "G-WWB6LN4BPL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };