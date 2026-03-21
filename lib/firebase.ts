// lib/firebase.ts (Sadece İSTEMCİ tarafında çalışır)
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD6Jku-93vod3rntWC-mW4D5WIAsW4XexA",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "temizisyapi-85066.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "temizisyapi-85066",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "temizisyapi-85066.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "140245080521",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:140245080521:web:6982c225ae7dede0aa3018",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-SMXJ19244X"
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let auth: Auth | null = null;

const isKeyValid = firebaseConfig.apiKey && 
                   firebaseConfig.apiKey.length > 5 && 
                   firebaseConfig.apiKey !== "undefined";

if (typeof window !== "undefined" && isKeyValid) {
    try {
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        db = getFirestore(app);
        storage = getStorage(app);
        auth = getAuth(app);
        console.log("Firebase initialized successfully on client.");
    } catch (error) {
        console.error("Firebase initialization error:", error);
    }
} else if (typeof window !== "undefined") {
    console.warn("Firebase: API Key is missing or invalid! Check environment variables.");
}

export { app, db, storage, auth };