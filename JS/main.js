// Switch form in sign in and sign up
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
// -------------------------------------------------------------------------------------

//store the data when the user input (sign up)
const signUpForm = document.querySelector(".form-container.sign-up form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const profileImg = document.querySelector(".profile-home img");
const morningMessage = document.querySelector(".morning span");

// Handle form submission
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting

  // Get user inputs
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // Save user data to localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const newUser = { name, email, password, profilePic: null };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Display the username in the greeting message
  morningMessage.textContent = name;

  // Optionally: Show success message using SweetAlert
  Swal.fire({
    imageUrl: '../Images//tickk.png',
    imageWidth: 80,
    imageHeight: 80,
    customClass: {image: 'custom-image'},
    title: "Account created!",
    text: "Your account has been created successfully!"
  });
});

// Profile image upload functionality
const profileInput = document.createElement("input");
profileInput.type = "file";
profileInput.accept = "image/*";

// Append the profile image input to the profile section
const profileContainer = document.querySelector(".profile-home");
profileContainer.addEventListener("click", () => {
  profileInput.click(); // Trigger file input when profile container is clicked
});

// Handle image selection
profileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      // Set the profile image to the selected image
      profileImg.src = reader.result;

      // Update the user's profile image in localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const currentUser = users.find(user => user.name === morningMessage.textContent);
      if (currentUser) {
        currentUser.profilePic = reader.result;
        localStorage.setItem("users", JSON.stringify(users));
      }
    };
    reader.readAsDataURL(file); // Convert the image to base64 for display
  }
});

// Select the sign-in form and input fields (sign in)
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
      imageUrl: '../Images//tickk.png',
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
      imageUrl: '../Images//delete.png',
      imageWidth: 80, 
      imageHeight: 80,
      customClass: {image: 'custom-image-delete'},
      title: "Login Failed",
      text: "Invalid email or password. Please try again."
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
          window.location.href = "../pages/account.html";
      }
  });
});

