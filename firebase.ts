import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyA9y0t_PwF0cTg4kQRg-z0djMwiVAFw--A",
  authDomain: "portfolio-18683.firebaseapp.com",
  projectId: "portfolio-18683",
  storageBucket: "portfolio-18683.firebasestorage.app",
  messagingSenderId: "1096257547352",
  appId: "1:1096257547352:web:5750b7f783a883a0d0ee2d",
  measurementId: "G-CJM3NR6FT8"
};

const hasFirebaseConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

if (!hasFirebaseConfig && import.meta.env.DEV) {
  // Loud but non-fatal: lets the rest of the app render even before
  // Firebase env vars are configured locally.
  console.warn(
    "[firebase] Missing VITE_FIREBASE_* env vars — Firebase features are disabled. See .env.example."
  );
}

export const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;

// Analytics only works in the browser, requires measurementId, and can be
// blocked by ad blockers / unsupported environments, so it's resolved
// asynchronously and may resolve to null.
export const analyticsPromise: Promise<Analytics | null> =
  app && typeof window !== "undefined"
    ? isSupported().then((supported) => (supported ? getAnalytics(app) : null))
    : Promise.resolve(null);

export default app;
