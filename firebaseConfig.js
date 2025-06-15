// firebaseConfig.ts (root)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBWoQdGMUdmAGLdOPBmOjDgB9jWwlR-QlI",
  authDomain: "health-advisor-app-91126.firebaseapp.com",
  projectId: "health-advisor-app-91126",
  storageBucket: "health-advisor-app-91126.appspot.com",  // fixed typo here
  messagingSenderId: "351239239841",
  appId: "1:351239239841:web:9c5fb932b33a084d6c18e0",
  measurementId: "G-TYVR2BXMGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
