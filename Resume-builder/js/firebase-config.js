
// Firebase Configuration (from your console screenshot)
const firebaseConfig = {
    apiKey: "AIzaSyAhJNR7ImhbtplaLMC6i-KSGXfuvBPAMWk",
    authDomain: "density-resume-builder.firebaseapp.com",
    projectId: "density-resume-builder",
    storageBucket: "density-resume-builder.firebasestorage.app",
    messagingSenderId: "1094402426334",
    appId: "1:1094402426334:web:8c702748cca2cff821094f",
    measurementId: "G-4GDDXERFF"
};

// Initialize Firebase via CDN (to avoid npm install)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile };
