
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDraNbms8xLrnq_dM627WzfRnQa1Ok_EvI",
  authDomain: "g2a--expense-tracker.firebaseapp.com",
  projectId: "g2a--expense-tracker",
  storageBucket: "g2a--expense-tracker.appspot.com",
  messagingSenderId: "613017930863",
  appId: "1:613017930863:web:916651bc265c695138d19a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);

// Select form elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signUpForm = document.querySelector(".sign-up form");

// Event listener for form submission
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from refreshing

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (name === "" || email === "" || password === "") {
    alert("All fields are required!");
    return;
  }

  // Check if the password already exists in the database
  const passwordRef = ref(db, "users");
  
  get(passwordRef).then((snapshot) => {
    let passwordExists = false;
    
    snapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val();
      if (userData.password === password) {
        passwordExists = true;
      }
    });

    if (passwordExists) {
      alert("This password is already in use by another account. Please choose a different password.");
      return; // Stop execution here, don't proceed to create user
    }

    // Create user in Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Store user profile data in Firebase Realtime Database (don't store password here for security reasons)
        return set(ref(db, "users/" + user.uid), {
          username: name,
          email: email,
          password: password, // ⚠️ WARNING: Storing passwords in the database is not secure (ideally, passwords should be hashed)
        });
      })
      .then(() => {
        alert("User registered successfully and data saved in Firebase!");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert("Error: " + error.message);
      });
  });
});
