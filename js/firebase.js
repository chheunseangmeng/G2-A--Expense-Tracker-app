// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
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

  // Ensure input is stored in Firebase
  set(ref(db, "users/" + name), {
    username: name,
    email: email,
    password: password // Not recommended to store passwords like this (use Firebase Auth instead)
  })
    .then(() => {
      return ref(db, "users/" + name);
    })
    .then((userRef) => {
      alert("User registered successfully and data saved in Firebase!");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});
