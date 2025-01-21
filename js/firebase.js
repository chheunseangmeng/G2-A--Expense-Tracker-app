// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDraNbms8xLrnq_dM627WzfRnQa1Ok_EvI",
  authDomain: "g2a--expense-tracker.firebaseapp.com",
  projectId: "g2a--expense-tracker",
  storageBucket: "g2a--expense-tracker.firebasestorage.app",
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
const signUpButton = document.querySelector("button");

// Event listener for sign-up button
signUpButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form from refreshing page

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (name === "" || email === "" || password === "") {
    alert("All fields are required!");
    return;
  }

  // Use Firebase Authentication to create a new user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User created successfully, now store additional profile data in Realtime Database
      const user = userCredential.user;

      // Store user profile data in Realtime Database
      return set(ref(db, "users/" + user.uid), {
        username: name,
        email: email,
        password: password,  // Storing password in the Realtime Database (Not recommended)
        profilePicture: "default.png", // You can set a default profile picture or leave it empty
      });
    })
    .then(() => {
      // If data is saved successfully, show success message
      alert("User registered successfully and data saved in Firebase!");
    })
    .catch((error) => {
      // Firebase Authentication error handling
      console.error("Error:", error.message);
      
      // Handle authentication or database errors
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please try a different one.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format. Please check your email.");
      } else {
        alert("Error: " + error.message);
      }
    });
});
