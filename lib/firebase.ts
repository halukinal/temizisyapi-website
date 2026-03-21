// lib/firebase.ts (Sadece İSTEMCİ tarafında çalışır)

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD6Jku-93vod3rntWC-mW4D5WIAsW4XexA",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "temizisyapi-85066.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "temizisyapi-85066",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "temizisyapi-85066.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "140245080521",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:140245080521:web:6982c225ae7dede0aa3018",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-SMXJ19244X"
};

let app: any = null;
let db: any = null;
let storage: any = null;
let auth: any = null;

const isKeyValid = firebaseConfig.apiKey && 
                   firebaseConfig.apiKey.length > 5 && 
                   firebaseConfig.apiKey !== "undefined";

if (typeof window !== "undefined" && isKeyValid) {
    try {
        const { initializeApp, getApps, getApp } = require("firebase/app");
        const { getFirestore } = require("firebase/firestore");
        const { getStorage } = require("firebase/storage");
        const { getAuth } = require("firebase/auth");

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