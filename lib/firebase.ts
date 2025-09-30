// lib/firebase.ts (Güncellenmiş Hali)

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // getAuth'u import et
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6Jku-93vod3rntWC-mW4D5WIAsW4XexA",
    authDomain: "temizisyapi-85066.firebaseapp.com",
    projectId: "temizisyapi-85066",
    storageBucket: "temizisyapi-85066.firebasestorage.app",
    messagingSenderId: "140245080521",
    appId: "1:140245080521:web:6982c225ae7dede0aa3018",
    measurementId: "G-SMXJ19244X"
  };

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // Auth servisini başlatıyoruz

export { db, storage, auth }; // auth'u da export ediyoruz