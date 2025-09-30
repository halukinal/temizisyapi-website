// lib/firebase.ts (Güncellenmiş Hali)

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase projenin konfigürasyon bilgileri
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "temizisyapi-com", // Proje ID'ni buraya yaz
  storageBucket: "YOUR_STORAGE_BUCKET", // Storage bucket URL'ini buraya yaz
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app); // Storage servisini başlatıyoruz

export { db, storage }; // Hem db'yi hem de storage'ı export ediyoruz