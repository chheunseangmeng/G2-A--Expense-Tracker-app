
// // Transaction Page Script: Retrieve and display transactions from localStorage
// const transactionList = document.getElementById('transaction-list');

// // Retrieve transactions from localStorage
// const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// // Update the transaction table with data from localStorage
// function updateTransactionTable() {
//   // Clear the table before updating
//   transactionList.innerHTML = '';

//   // Add all transactions from localStorage
//   transactions.forEach((transaction) => {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${transaction.category}</td>
//       <td>$${transaction.amount.toFixed(2)}</td>
//       <td>${getMonthName(transaction.month)}</td>
//       <td><button class="btn-remove" onclick="removeTransaction(${transaction.id})">Remove</button></td>
//     `;
//     transactionList.appendChild(row);
//   });
// }

// // Helper function to get the month name
// function getMonthName(monthNumber) {
//   const months = [
//     "January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"
//   ];
//   return months[monthNumber - 1];
// }

// // Remove transaction from localStorage (if needed on this page)
// function removeTransaction(id) {
//   let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
//   transactions = transactions.filter((transaction) => transaction.id !== id);
//   localStorage.setItem('transactions', JSON.stringify(transactions));
//   updateTransactionTable();
// }

// // Initialize the table on page load
// updateTransactionTable();







// update the code 
// Transaction Page Script: Retrieve and display transactions from localStorage
const transactionList = document.getElementById("transaction-list");

// Retrieve transactions from localStorage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let totalSaving = JSON.parse(localStorage.getItem("totalSaving")) || 0;
let totalIncome = JSON.parse(localStorage.getItem("totalIncome")) || 0;
let totalExpenses = JSON.parse(localStorage.getItem("totalExpenses")) || 0;
let editId = null;

// Update the transaction table with data from localStorage
function updateTransactionTable() {
  // Clear the table before updating
  transactionList.innerHTML = "";

  // Add all transactions from localStorage
  transactions.forEach((transaction) => {
    const row = document.createElement("tr");
    row.innerHTML = `
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
    transactionList.appendChild(row);
  });
}

// Edit Transaction Function
function editTransaction(id) {
  const transaction = transactions.find((transaction) => transaction.id === id);
  if (transaction) {
    // Store ID for update
    editId = id;

    // Pre-fill the form with transaction data
    document.getElementById("transaction-amount").value = transaction.amount;
    document.getElementById("transaction-category").value = transaction.category;
    document.getElementById("transaction-months").value = transaction.month;

    Swal.fire({
      imageUrl: "../Images/edit.png",
      imageWidth: 80,
      imageHeight: 80,
      customClass: { image: "custom-image" },
      title: "Edit Mode",
      text: "You can now edit the transaction in the form.",
    });
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

      // Remove transaction from array
      transactions = transactions.filter((transaction) => transaction.id !== id);

      // Save updated data to localStorage
      localStorage.setItem("transactions", JSON.stringify(transactions));
      localStorage.setItem("totalSaving", totalSaving);
      localStorage.setItem("totalIncome", totalIncome);
      localStorage.setItem("totalExpenses", totalExpenses);

      updateTransactionTable();

      Swal.fire({
        imageUrl: "../Images/tickk.png",
        imageWidth: 80,
        imageHeight: 80,
        customClass: { image: "custom-image" },
        title: "Deleted!",
        text: "Your transaction has been deleted.",
      });
    }
  });
}

// Helper function to get the month name
function getMonthName(monthNumber) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthNumber - 1];
}

// Initialize the table on page load
updateTransactionTable();