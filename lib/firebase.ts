// lib/firebase.ts (Güvenli ve Hata Yönetimli)

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: FirebaseApp | undefined;
let db: Firestore | any;
let storage: FirebaseStorage | any;
let auth: Auth | any;

// Mentor Notu: Build sırasında API key eksikliği veya yanlış karakter (tırnak gibi) olması durumunda çökmemesi için kontrol ekledik.
const isKeyValid = firebaseConfig.apiKey && 
                   firebaseConfig.apiKey.length > 5 && 
                   firebaseConfig.apiKey !== "undefined" &&
                   !firebaseConfig.apiKey.includes("\"") &&
                   !firebaseConfig.apiKey.includes("'");

if (isKeyValid) {

    try {
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        db = getFirestore(app);
        storage = getStorage(app);
        auth = getAuth(app);
    } catch (error) {
        console.error("Firebase initialization error:", error);
    }
} else {
    console.warn("Firebase API Key is missing. Firebase services will not be initialized.");
}

export { db, storage, auth };