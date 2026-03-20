// lib/firebase.ts (Sadece İSTEMCİ tarafında çalışır)

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app: any = null;
let db: any = null;
let storage: any = null;
let auth: any = null;

if (typeof window !== "undefined") {
    const { initializeApp, getApps, getApp } = require("firebase/app");
    const { getFirestore } = require("firebase/firestore");
    const { getStorage } = require("firebase/storage");
    const { getAuth } = require("firebase/auth");

    const isKeyValid = firebaseConfig.apiKey && 
                       firebaseConfig.apiKey.length > 5 && 
                       firebaseConfig.apiKey !== "undefined";

    if (isKeyValid) {
        try {
            app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
            db = getFirestore(app);
            storage = getStorage(app);
            auth = getAuth(app);
            console.log("Firebase initialized successfully on client.");
        } catch (error) {
            console.error("Firebase initialization error:", error);
        }
    } else {
        console.warn("Firebase: API Key is missing or invalid! Check environment variables.", {
            hasKey: !!firebaseConfig.apiKey,
            keyLength: firebaseConfig.apiKey?.length,
            apiKey: firebaseConfig.apiKey
        });
    }
}

export { app, db, storage, auth };