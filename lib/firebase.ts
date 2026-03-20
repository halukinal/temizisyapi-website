// lib/firebase.ts (Sadece İSTEMCİ tarafında çalışır)

const firebaseConfig = {
    apiKey: "AIzaSyD6Jku-93vod3rntWC-mW4D5WIAsW4XexA",
    authDomain: "temizisyapi-85066.firebaseapp.com",
    projectId: "temizisyapi-85066",
    storageBucket: "temizisyapi-85066.appspot.com",
    messagingSenderId: "140245080521",
    appId: "1:140245080521:web:6982c225ae7dede0aa3018",
    measurementId: "G-SMXJ19244X"
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