// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, collection, addDoc, serverTimestamp, updateDoc  } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtL1-FqjZ9G_6wXy95jQkbnlzhEdv3Oy8",
  authDomain: "studyfinder-606e0.firebaseapp.com",
  projectId: "studyfinder-606e0",
  storageBucket: "studyfinder-606e0.firebasestorage.app",
  messagingSenderId: "883661976713",
  appId: "1:883661976713:web:e3ac09739851ef2650c258"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Emulator setup for local testing
if (location.hostname === 'localhost') {
  auth.useEmulator('http://localhost:9099');
  db.useEmulator('localhost', 8080);
}


// if (location.hostname === 'localhost') {
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

// Export initialized modules
export { app, auth, db };