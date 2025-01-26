const totalSavingElement = document.getElementById("total-saving");
const totalIncomeElement = document.getElementById("total-income");
const totalExpensesElement = document.getElementById("total-expenses");

const savingInput = document.getElementById("saving-input");
const addSavingButton = document.getElementById("add-saving-btn");
const showInputButton = document.getElementById("show-input-btn");
const savingInputContainer = document.getElementById("saving-input-container");
const cancelSavingButton = document.getElementById("cancel-saving-btn");

const transactionForm = document.getElementById("transaction-form");
const transactionAmountInput = document.getElementById("transaction-amount");
const transactionCategoryInput = document.getElementById("transaction-category");
const transactionMonthInput = document.getElementById("transaction-months");
const transactionList = document.getElementById("transaction-list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let totalSaving = JSON.parse(localStorage.getItem("totalSaving")) || 0;
let totalIncome = JSON.parse(localStorage.getItem("totalIncome")) || 0;
let totalExpenses = JSON.parse(localStorage.getItem("totalExpenses")) || 0;
let editId = null;

// Show input for adding savings
showInputButton.addEventListener("click", () => {
  savingInputContainer.style.display = "block";
  showInputButton.style.display = "none";
});

// Cancel adding saving
cancelSavingButton.addEventListener("click", () => {
  savingInputContainer.style.display = "none";
  showInputButton.style.display = "block";
  savingInput.value = "";
});

function updateUI() {
  totalSavingElement.textContent = `$${totalSaving.toFixed(2)}`;
  totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
  totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;

  transactionList.innerHTML = "";

  transactions.forEach((transaction) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input type="checkbox" class="category-checkbox" data-id="${transaction.id}" ${transaction.checked ? 'checked' : ''}></td>
      <td>${transaction.category}</td> 
      <td>$${transaction.amount.toFixed(2)}</td> 
      <td>${getMonthName(transaction.month)}</td> 
      <td>
        <button class="btn edit-btn" onclick="editTransaction(${transaction.id})">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="btn delete-btn" onclick="deleteTransaction(${transaction.id})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;

    const checkbox = row.querySelector('.category-checkbox');
    checkbox.addEventListener('change', (e) => {
      const transactionId = e.target.dataset.id;
      const transaction = transactions.find(t => t.id == transactionId);

      // Update the transaction's checked state
      transaction.checked = e.target.checked;

      // Subtract from saving and income when checked
      if (e.target.checked) {
        totalSaving -= transaction.amount;
        totalIncome -= transaction.amount;
        totalExpenses += transaction.amount;  // Add the amount to expenses
      } else {
        totalSaving += transaction.amount;
        totalIncome += transaction.amount;
        totalExpenses -= transaction.amount;  // Subtract the amount from expenses
      }

      // Save updated data to localStorage
      localStorage.setItem("transactions", JSON.stringify(transactions));
      localStorage.setItem("totalSaving", totalSaving);
      localStorage.setItem("totalIncome", totalIncome);
      localStorage.setItem("totalExpenses", totalExpenses);

      // Update the UI
      updateUI();
    });

    transactionList.appendChild(row);
  });
}
updateUI();

// Helper function to convert month number to month name
function getMonthName(monthNumber) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber - 1]; // Adjust for zero-based index
}

// Add Saving Function
addSavingButton.addEventListener("click", () => {
  const savingAmount = parseFloat(savingInput.value);

  if (!isNaN(savingAmount) && savingAmount > 0) {
    totalSaving += savingAmount;
    totalIncome += savingAmount;

    // Save data to localStorage
    localStorage.setItem("totalSaving", totalSaving);
    localStorage.setItem("totalIncome", totalIncome);

    updateUI();

    savingInput.value = "";
    savingInputContainer.style.display = "none";
    showInputButton.style.display = "block";

    // Show success message
    Swal.fire({
      imageUrl: "../../image/tickk.png",
      imageWidth: 80,
      imageHeight: 80,
      customClass: { image: "custom-image" },
      title: "Success!",
      text: "Saving added successfully!",
    });
  } else {
    // Show error message
    Swal.fire({
      imageUrl: "../../image/delete.png",
      imageWidth: 80,
      imageHeight: 80,
      customClass: { image: "custom-image-delete" },
      title: "Error",
      text: "Please enter a valid saving amount",
    });
  }
});



transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get text from the elements and remove the "$" sign
  const savingText = document.getElementById("total-saving").innerText.trim();
  const incomeText = document.getElementById("total-income").innerText.trim();

  // Convert to numbers (remove $ and parse as float)
  const savingAmount = parseFloat(savingText.replace("$", "")) || 0;
  const incomeAmount = parseFloat(incomeText.replace("$", "")) || 0;

  console.log("Saving Amount:", savingAmount, "Income Amount:", incomeAmount); // Debugging


  if (savingAmount === 0 || incomeAmount === 0) {
    Swal.fire({
      imageUrl: "../../image/delete.png",
      imageWidth: 80,
      imageHeight: 80,
      customClass: { image: "custom-image-delete" },
      title: "Error",
      text: "You cannot add an expense because Savings and Income are empty or zero. Please add money first.",
    });
    return; // Stop function execution
  }

  // Get expense details
  const expenseAmount = parseFloat(transactionAmountInput.value);
  const category = transactionCategoryInput.value;
  const month = transactionMonthInput.value;

  console.log("Expense Details:", { category, expenseAmount, month }); // Debugging


  if (!category || isNaN(expenseAmount) || expenseAmount <= 0 || !month) {
    Swal.fire({
      imageUrl: "../../image/delete.png",
      imageWidth: 80,
      imageHeight: 80,
      customClass: { image: "custom-image-delete" },
      title: "Error",
      text: "Please fill in all fields correctly.",
    });
    return; // Stop function execution
  }



  if (expenseAmount > savingAmount) {
    Swal.fire({
      imageUrl: "../../image/delete.png",
      imageWidth: 80,
      imageHeight: 80,
      customClass: { image: "custom-image-delete" },
      title: "Error",
      text: "You don't have enough money for adding!",
    });
    return; // Stop function execution
  }

  const transactionId = transactionForm.dataset.transactionId;
  let transaction;

  if (transactionId) {
    // Editing an existing transaction
    transaction = transactions.find((t) => t.id == transactionId);
    if (transaction) {
      transaction.category = category;
      transaction.amount = expenseAmount;
      transaction.month = month;
      console.log("Transaction Updated:", transaction); // Debugging
    }
  } else {
    // Creating a new transaction
    transaction = {
      id: Date.now(),
      category,
      amount: expenseAmount,
      month,
    };
    transactions.push(transaction);
    console.log("New Transaction Added:", transaction); // Debugging
  }

  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateUI();
  console.log("UI Updated!"); // Debugging
  transactionForm.reset();
  delete transactionForm.dataset.transactionId;
});
// ----------------------------------------------------------------------------------------------------------------------


// Example of setting the form for editing an existing transaction
function editTransaction(transactionId) {
  const transaction = transactions.find(t => t.id === transactionId);
  if (transaction) {
    // Fill in the form with the existing transaction data
    transactionCategoryInput.value = transaction.category;
    transactionAmountInput.value = transaction.amount;
    transactionMonthInput.value = transaction.month;

    // Set the form's data-transaction-id for identification
    transactionForm.dataset.transactionId = transaction.id;
  }
}

// Delete Transaction Function with SweetAlert Confirmation
function deleteTransaction(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this transaction?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      const transaction = transactions.find((t) => t.id === id);
      if (transaction) {
        totalSaving += transaction.amount;
        totalIncome += transaction.amount;
        totalExpenses -= transaction.amount;
      }

      transactions = transactions.filter(
        (transaction) => transaction.id !== id
      );

      // Save updated data to localStorage
      localStorage.setItem("transactions", JSON.stringify(transactions));
      localStorage.setItem("totalSaving", totalSaving);
      localStorage.setItem("totalIncome", totalIncome);
      localStorage.setItem("totalExpenses", totalExpenses);

      updateUI();

     

      
    }
  });
}

// Initialize UI
updateUI();

// to display the chart 
document.addEventListener("DOMContentLoaded", () => {
  const btnReport = document.getElementById("btn-report");
  const btnCancel = document.getElementById("btn-cancel");
  const chartContainer = document.getElementById("chart-container");
  const myChartCanvas = document.getElementById("myChart").getContext("2d");

  let isDragging = false, offsetX = 0, offsetY = 0;

  // Function to fetch and display chart data
  function displayChart() {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    const monthData = {
      January: 0, February: 0, March: 0, April: 0, May: 0, June: 0,
      July: 0, August: 0, September: 0, October: 0, November: 0, December: 0
    };

    transactions.forEach(transaction => {
      const month = getMonthName(transaction.month);
      if (month) {
        monthData[month] += transaction.amount;
      }
    });

    const months = Object.keys(monthData);
    const amounts = months.map(month => monthData[month]);

    new Chart(myChartCanvas, {
      type: "bar",
      data: {
        labels: months,
        datasets: [{
          label: 'Monthly Expenses $',
          data: amounts,
          backgroundColor: '#FF5733',
          borderColor: '#FF5733',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        },
        responsive: true
      }
    });
  }

  // Show the chart container
  btnReport.addEventListener("click", () => {
    chartContainer.style.display = "block";
    displayChart();
  });

  // Hide the chart container
  btnCancel.addEventListener("click", () => {
    chartContainer.style.display = "none";
  });

  // Dragging Functionality
  chartContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - chartContainer.offsetLeft;
    offsetY = e.clientY - chartContainer.offsetTop;
    chartContainer.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      chartContainer.style.left = `${e.clientX - offsetX}px`;
      chartContainer.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    chartContainer.style.cursor = "grab";
  });

  function getMonthName(monthNumber) {
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return months[monthNumber - 1];
  }
});

// -----------------------------------------------------------------------------------


document.getElementById("export-pdf-btn").addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Set title
  doc.text("Expense Monthly Report", 14, 10);

  // Get the transaction list (table body)
  const tableBody = document.getElementById("transaction-list");

  if (!tableBody || tableBody.children.length === 0) {
    Swal.fire({
      imageUrl: "../../image/delete.png",
      imageWidth: 80,
      imageHeight: 80,
      customClass: { image: "custom-image-delete" },
      title: "Error",
      text: "No transactions available to export!",
    });
    return; // Stop execution if no data is displayed
  }

  const rows = [];

  // Extract displayed table data
  tableBody.querySelectorAll("tr").forEach(tr => {
    const row = [];
    tr.querySelectorAll("td").forEach((td, index) => {
      if (index === 2) {  
        const monthNumber = td.innerText.trim();  
        row.push(getMonthName(monthNumber));  
      } else if (index === 3) {  
        row.push(td.innerText.trim()); 
      } else {
        row.push(td.innerText.trim()); 
      }
    });
    if (row.length > 0) {
      rows.push(row);
    }
  });

  if (rows.length === 0) {
    Swal.fire({
      imageUrl: "../../image/delete.png",
      imageWidth: 80,
      imageHeight: 80,
      customClass: { image: "custom-image-delete" },
      title: "Error",
      text: "No transaction data found in the table!",
    });
    return;
  }

  // Generate table in PDF using AutoTable
  doc.autoTable({
    head: [["Check", "Categories", "Amount", "Monthly"]],
    body: rows,
    startY: 20
  });

  // Save the PDF
  doc.save("Expense_Report.pdf");
});

// Helper function to convert month number to month name
function getMonthName(monthNumber) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[parseInt(monthNumber) - 1];
}

// ------------ responsive nav
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



