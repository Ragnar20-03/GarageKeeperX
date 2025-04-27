// lib/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCkJ66OMP-98cfOWxyWHFLMphP0Ls85_vA",
    authDomain: "garagekeeper-4390b.firebaseapp.com",
    projectId: "garagekeeper-4390b",
    storageBucket: "garagekeeper-4390b.firebasestorage.app",
    messagingSenderId: "967780580281",
    appId: "1:967780580281:web:eb7a8e2ec90e64d975d468",
    measurementId: "G-339VCVVFMC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db };
