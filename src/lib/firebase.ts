import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// All values come from Vite env vars (VITE_ prefix required to be exposed
// to client code). Copy .env.example to .env and fill in your Firebase
// project's config — see https://console.firebase.google.com.
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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