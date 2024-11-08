import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCD99YPuzlK8F7PHhF_S2-byMslXDoEYoY",
  authDomain: "ai-trip-planner-f7cdd.firebaseapp.com",
  projectId: "ai-trip-planner-f7cdd",
  storageBucket: "ai-trip-planner-f7cdd.firebasestorage.app",
  messagingSenderId: "715897998096",
  appId: "1:715897998096:web:9b32062d52834973717395",
  measurementId: "G-06MX5LX2B3",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
