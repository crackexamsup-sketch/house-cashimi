import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAiP6L-VtkPSh3R8Q95NHEXiTCM3NOe9c",
  authDomain: "cashimi-a9fd7.firebaseapp.com",
  projectId: "cashimi-a9fd7",
  storageBucket: "cashimi-a9fd7.firebasestorage.app",
  messagingSenderId: "1038977960770",
  appId: "1:1038977960770:web:af48704b3c69d0295516db",
  measurementId: "G-HR6N1N7ZBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (Optional, but included in your config)
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);