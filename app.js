

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Your Firebase config
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

// Handle Register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const loader = document.getElementById("loader");
  loader.classList.remove("hidden"); // show spinner

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const confirmPassword = document.getElementById('regConfirmPassword').value.trim();

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire('Error', 'Please fill out all fields!', 'error');
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire('Invalid Email', 'Please enter a valid email address!', 'error');
      return;
    }

    if (password.length < 6) {
      Swal.fire('Weak Password', 'Password should be at least 6 characters!', 'error');
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire('Mismatch', 'Passwords do not match!', 'error');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()  // Set initial lastLoginAt as registration time
      });

      Swal.fire('Success', 'Registration Successful!', 'success').then(() => {
        window.location.href = "dash.html"; // Redirect after successful registration
      });

    } catch (error) {
      console.error(error);
      Swal.fire('Error', error.message, 'error');
    }

    
 loader.classList.add("hidden"); // hide spinner
  });

  
}

// Handle Login
// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();


        const loader = document.getElementById("loader");
  loader.classList.remove("hidden"); // show spinner

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
      Swal.fire('Error', 'Please fill out both fields!', 'error');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Firestore with login timestamp ONLY
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        lastLoginAt: serverTimestamp()
      });

      Swal.fire('Success', 'Login Successful!', 'success').then(() => {
        window.location.href = "dash.html"; // Redirect after successful login
      });

    } catch (error) {
      console.error(error);
      Swal.fire('Login Failed', error.message, 'error');
    }

     loader.classList.add("hidden"); // hide spinner
  });
}


// Helper Functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
