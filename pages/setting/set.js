// verify check password is correct 
  /**
   * Toggles the visibility of a password field.
   * @param {string} fieldId - The ID of the field to toggle.
   */
  function toggleVisibility(fieldId) {
     const field = document.getElementById(fieldId);
     field.type = field.type === 'password' ? 'text' : 'password';
   }
 
   /**
    * Enables or disables editing of an input field.
    * @param {string} fieldId - The ID of the field to toggle.
    */
   function toggleEdit(fieldId) {
     const field = document.getElementById(fieldId);
     field.disabled = !field.disabled; // Toggle the 'disabled' state
     if (!field.disabled) {
       field.focus(); // Focus the field if it's enabled
     }
   }
 
   /**
    * Validates the form inputs before submission.
    * @returns {boolean} - Returns true if validation passes, otherwise false.
    */
   function validateForm() {
     const email = document.getElementById('email').value;
     const password = document.getElementById('password').value;
     const confirmPassword = document.getElementById('confirmPassword').value;
 
     // Check if passwords match
     if (password !== confirmPassword) {
       alert('Passwords do not match!');
       return false;
     }
 
     // Check if email is valid (basic regex)
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailPattern.test(email)) {
       alert('Please enter a valid email address!');
       return false;
     }
 
     // If all validations pass
     alert('Form submitted successfully!');
     return true;
   }
 
   // Attach validation to form submission
   document.getElementById('settingForm').addEventListener('submit', function (e) {
     e.preventDefault(); // Prevent the default form submission
     if (validateForm()) {
       // Proceed with saving or sending data
       console.log('Form Data:', {
         email: document.getElementById('email').value,
         password: document.getElementById('password').value,
       });
       alert('Settings updated successfully!');
     }
   });

// Functional number 2
 // Function to toggle password visibility
    function toggleVisibility(fieldId) {
      const field = document.getElementById(fieldId);
      field.type = field.type === 'password' ? 'text' : 'password';
    }

    // Function to enable or disable editing of the email field
    function toggleEdit(fieldId) {
      const field = document.getElementById(fieldId);
      field.disabled = !field.disabled; // Toggle the disabled state
      if (!field.disabled) {
        field.focus(); // Focus the field if it's enabled
      }
    }

    // Function to validate the form
    function validateForm() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      // Check if passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
      }

      // Check if email is valid
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address!');
        return false;
      }

      return true;
    }

    // Attach form validation to the submit event
    document.getElementById('settingForm').addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent the default form submission
      if (validateForm()) {
        console.log('Form Data:', {
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        });
        alert('Settings updated successfully!');
      }
    });

// The last funcational 
// Initialize Firebase (ensure firebase.js is loaded)
import { getAuth, updateProfile, updatePassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Get reference to form and input fields
const settingForm = document.getElementById('settingForm');
const nameInput = document.getElementById('password'); // "password" field for the name
const passwordInput = document.getElementById('password'); // First password input
const confirmPasswordInput = document.getElementById('confirmPassword'); // Confirm password input

// Reference Firebase Authentication
const auth = getAuth();

// Function to toggle password visibility
function toggleVisibility(fieldId) {
  const field = document.getElementById(fieldId);
  field.type = field.type === 'password' ? 'text' : 'password';
}

// Enable editing for the name input
function enableEdit(fieldId) {
  const field = document.getElementById(fieldId);
  field.disabled = !field.disabled;
  if (!field.disabled) {
    field.focus();
  }
}

// Validate the form
function validateForm() {
  const name = nameInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Check if passwords match
  if (password !== confirmPassword) {
    Swal.fire('Error', 'Passwords do not match!', 'error');
    return false;
  }

  // Check if the name is not empty
  if (name.trim() === "") {
    Swal.fire('Error', 'Name cannot be empty!', 'error');
    return false;
  }

  return true;
}

// Handle form submission
settingForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  if (validateForm()) {
    const user = auth.currentUser; // Get the currently authenticated user
    const newName = nameInput.value;
    const newPassword = passwordInput.value;

    // Update the user's name in Firebase Authentication
    updateProfile(user, {
      displayName: newName
    })
      .then(() => {
        // Save the updated name in the Realtime Database (if applicable)
        const db = getDatabase();
        set(ref(db, 'users/' + user.uid), {
          username: newName,
          email: user.email
        })
          .then(() => {
            Swal.fire('Success', 'Name updated successfully!', 'success');
          })
          .catch((error) => {
            Swal.fire('Error', 'Error saving name to database!', 'error');
            console.error(error);
          });
      })
      .catch((error) => {
        Swal.fire('Error', 'Error updating name!', 'error');
        console.error(error);
      });

    // If the user changed the password, update it in Firebase Authentication
    if (newPassword) {
      updatePassword(user, newPassword)
        .then(() => {
          Swal.fire('Success', 'Password updated successfully!', 'success');
        })
        .catch((error) => {
          Swal.fire('Error', 'Error updating password!', 'error');
          console.error(error);
        });
    }
  }
});
