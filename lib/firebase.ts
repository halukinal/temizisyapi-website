// lib/firebase.ts (Sadece İstemci Tarafı İçin Güvenli)

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let db: any = null;
let storage: any = null;
let auth: any = null;

// Sadece TARAYICI (Browser) ortamında Firebase SDK'yı başlatıyoruz.
// Cloudflare Workers (Sunucu) tarafında bu SDK eval() kullandığı için hata veriyor.
if (typeof window !== "undefined") {
    // Top-level import yerine require kullanarak sunucu tarafında yüklenmesini engelliyoruz.
    const { initializeApp, getApps, getApp } = require("firebase/app");
    const { getFirestore } = require("firebase/firestore");
    const { getStorage } = require("firebase/storage");
    const { getAuth } = require("firebase/auth");

    const isKeyValid = firebaseConfig.apiKey && 
                       firebaseConfig.apiKey.length > 5 && 
                       firebaseConfig.apiKey !== "undefined";

    if (isKeyValid) {
        try {
            const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
            db = getFirestore(app);
            storage = getStorage(app);
            auth = getAuth(app);
        } catch (error) {
            console.error("Firebase initialization error:", error);
        }
    }
}

export { db, storage, auth };