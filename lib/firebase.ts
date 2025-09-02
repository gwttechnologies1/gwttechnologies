// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH9fkKd8oQc4TwXlGzTarwpdj4S0AGiqI",
  authDomain: "gwttechnologies-615d6.firebaseapp.com",
  projectId: "gwttechnologies-615d6",
  storageBucket: "gwttechnologies-615d6.firebasestorage.app",
  messagingSenderId: "102222394283",
  appId: "1:102222394283:web:e257de527ac4cbdba498ee",
  measurementId: "G-BJKJMR1NNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Analytics only on client side
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;