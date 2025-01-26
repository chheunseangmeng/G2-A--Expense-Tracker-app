const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Get the elements
const createAccountBtn = document.querySelector(".btn-2");
const modalContainer = document.getElementById("container");
const containerWebsite = document.querySelector(".container-website"); // The background container

// Hide the modal initially
modalContainer.style.display = "none";

// Show the modal and blur the background when the button is clicked
createAccountBtn.addEventListener("click", (event) => {
  modalContainer.style.display = "block";
  containerWebsite.classList.add("blur"); // Apply blur to the background
  event.stopPropagation(); // Prevent event from bubbling to document click
});

// Hide the modal and remove the blur when clicking outside the modal
document.addEventListener("click", (event) => {
  if (
    !modalContainer.contains(event.target) &&
    event.target !== createAccountBtn
  ) {
    modalContainer.style.display = "none";
    containerWebsite.classList.remove("blur"); // Remove blur effect when modal is hidden
  }
});

//store the data when the user input
const signUpForm = document.querySelector(".form-container.sign-up form"); // The sign-up form
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Event listener to handle form submission
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission to the server

  // Get the values from the input fields
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // Get the existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || []; // If no users exist, default to an empty array

  // Check if the email already exists in localStorage
  const emailExists = users.some((user) => user.email === email);

  // Check if the password already exists in any existing user (passwords should be unique)
  const passwordExists = users.some((user) => user.password === password);

  // If the email or password exists, show an error message
  if (emailExists) {
    Swal.fire({
      imageUrl: "../../image/delete.png",
      imageWidth: 80,
      imageHeight: 80,
      customClass: { image: "custom-image-delete" },
      title: "Oops...",
      text: "This email is already associated with an account. Please use a different email.",
    });
    return; // Stop further execution if email exists
  }

  if (passwordExists) {
    Swal.fire({
      imageUrl: "../../image/delete.png",
      imageWidth: 80,
      imageHeight: 80,
      customClass: { image: "custom-image-delete" },
      title: "Oops...",
      text: "This password is already in use. Please choose a different password.",
    });
    return; // Stop further execution if password exists
  }

  // If email and password are unique, create a new user object
  const newUser = {
    name,
    email,
    password,
  };

  // Add the new user to the users array
  users.push(newUser);

  // Save the updated users array to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Show SweetAlert success message
  Swal.fire({
    imageUrl: '../image/tickk.png',
    imageWidth: 80,
    imageHeight: 80,
    customClass: {image: 'custom-image'},
    title: "Account created!",
    text: "Your account has been created successfully!",
  });
});

// Select the sign-in form and input fields
const signInForm = document.querySelector(".form-container.sign-in form");
const signInEmailInput = signInForm.querySelector('input[type="email"]');
const signInPasswordInput = signInForm.querySelector('input[type="password"]');

// Event listener to handle login form submission
signInForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission to the server

  // Get the values from the input fields
  const email = signInEmailInput.value;
  const password = signInPasswordInput.value;

  // Get the existing users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || []; // Default to an empty array if no users exist

  // Check if the user exists and the credentials are correct
  const validUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (validUser) {
    // Show a success message and redirect to the dashboard
    Swal.fire({
      imageUrl: '../image/tickk.png',
      imageWidth: 80, 
      imageHeight: 80,
      customClass: {
        image: 'custom-image' // Applying a custom class to the image
      },
      title: "Welcome back successful log in!",
      text: `Hello, ${validUser.name}! You have successfully logged in.`,
    }).then(() => {
      // Redirect or update UI to show the dashboard
      console.log("Redirect to dashboard or show dashboard content.");
    });
  } else {
    // Show an error message if the credentials are incorrect
    Swal.fire({
      imageUrl: '../image/delete.png',
      imageWidth: 80, 
      imageHeight: 80,
      customClass: {image: 'custom-image-delete'},
      title: "Login Failed",
      text: "Invalid email or password. Please try again.",
    });
  }
});

// log out form 
document.getElementById("logoutBtn").addEventListener("click", function() {
  // Show confirmation before logging out
  Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out!"
  }).then((result) => {
      if (result.isConfirmed) {
          // Clear the current logged-in user data from localStorage
          localStorage.removeItem("loggedInUser");

          // Redirect to login page
          window.location.href = "../pages/account/account.html";
      }
  });
});
// icon /////////
document.getElementById("menuToggle").addEventListener("click", function () {
  let sidebar = document.querySelector(".left-side");
  let menuIcon = document.getElementById("menuToggle");
  let container = document.querySelector(".container-website");

  sidebar.classList.toggle("active"); // Toggle Sidebar

  // Check if .container-website exists before adding class
  if (container) {
    container.classList.toggle("overlay-active");
  }
 
  // Change button icon
  if (sidebar.classList.contains("active")) {
    menuIcon.innerHTML = '<i class="fa-solid fa-x"></i>'; // Change to "X"
  } else {
    menuIcon.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Change back to menu
  }
});


// profile ////
document.addEventListener("DOMContentLoaded", () => {
  // Load the stored profile image if it exists
  const storedImage = localStorage.getItem('profileImage');
  if (storedImage) {
    document.getElementById('profileImage').src = storedImage;
  }

  const profileImage = document.getElementById('profileImage');
  const imageUpload = document.getElementById('imageUpload');

  // Trigger the file input click when the profile image is clicked
  profileImage.addEventListener('click', () => {
    imageUpload.click();
  });

  imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        const imageUrl = e.target.result;
        profileImage.src = imageUrl; // Replace the profile image
        // Save the new image URL to localStorage
        localStorage.setItem('profileImage', imageUrl);
      };
      
      reader.readAsDataURL(file);
    }
  });
});



