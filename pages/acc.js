// const totalSavingElement = document.getElementById("total-saving");
// const totalIncomeElement = document.getElementById("total-income");
// const totalExpensesElement = document.getElementById("total-expenses");

// const savingInput = document.getElementById("saving-input");
// const addSavingButton = document.getElementById("add-saving-btn");
// const showInputButton = document.getElementById("show-input-btn");
// const savingInputContainer = document.getElementById("saving-input-container");
// const cancelSavingButton = document.getElementById("cancel-saving-btn");

// const transactionForm = document.getElementById("transaction-form");
// const transactionAmountInput = document.getElementById("transaction-amount");
// const transactionCategoryInput = document.getElementById(
//   "transaction-category"
// );
// const transactionList = document.getElementById("transaction-list");

// let transactions = [];
// let totalSaving = 0;
// let totalIncome = 0;
// let totalExpenses = 0;
// let editId = null;

// // Show input for adding savings
// showInputButton.addEventListener("click", () => {
//   savingInputContainer.style.display = "block";
//   showInputButton.style.display = "none";
// });

// // Cancel adding saving
// cancelSavingButton.addEventListener("click", () => {
//   savingInputContainer.style.display = "none";
//   showInputButton.style.display = "block";
//   savingInput.value = "";
// });

// // Function to update UI
// function updateUI() {
//   totalSavingElement.textContent = `$${totalSaving.toFixed(2)}`;
//   totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
//   totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;

//   // Clear transaction list
//   transactionList.innerHTML = "";

//   // Populate transaction list
//   transactions.forEach((transaction) => {
//     const row = document.createElement("tr");

//     // Display category, amount, and month in the table
//     row.innerHTML = `
//       <td>${transaction.category}</td> <!-- Category -->
//       <td>$${transaction.amount.toFixed(2)}</td> <!-- Amount -->
//       <td>${getMonthName(transaction.month)}</td> <!-- Display the month -->
//       <td>
//         <button class="btn edit-btn" onclick="editTransaction(${
//           transaction.id
//         })">
//           <i class="fa-solid fa-pen-to-square"></i>
//         </button>
//         <button class="btn delete-btn" onclick="deleteTransaction(${
//           transaction.id
//         })">
//           <i class="fa-solid fa-trash-can"></i>
//         </button>
//       </td>
//     `;

//     transactionList.appendChild(row); // Append to the table
//   });
// }

// // Helper function to convert month number to month name
// function getMonthName(monthNumber) {
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   return months[monthNumber - 1]; // Adjust for zero-based index
// }

// // Add Saving Function
// addSavingButton.addEventListener("click", () => {
//   const savingAmount = parseFloat(savingInput.value);

//   if (!isNaN(savingAmount) && savingAmount > 0) {
//     totalSaving += savingAmount;
//     totalIncome += savingAmount;

//     updateUI();

//     savingInput.value = "";
//     savingInputContainer.style.display = "none";
//     showInputButton.style.display = "block";
//   } else {
//     Swal.fire({
//       imageUrl: '../Images//delete.png',
//       imageWidth: 80, 
//       imageHeight: 80,
//       customClass: {image: 'custom-image-delete'},
//       title: "Error",
//       text: "Please enter a valid saving amount"
//     });
//   }
// });

// // Expense Submission Function
// transactionForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const expenseAmount = parseFloat(transactionAmountInput.value);
//   const category = transactionCategoryInput.value;
//   const month = document.getElementById("transaction-months").value; // Get selected month

//   if (!category || isNaN(expenseAmount) || expenseAmount <= 0 || !month) {
//     Swal.fire({
//       imageUrl: '../Images//delete.png',
//       imageWidth: 80, 
//       imageHeight: 80,
//       customClass: {image: 'custom-image-delete'},
//       title: "Error",
//       text: "Please fill in all fields correctly"
//     });
//     return;
//   }

//   if (expenseAmount > totalSaving) {
//     Swal.fire({
//       imageUrl: '../Images//delete.png',
//       imageWidth: 80, 
//       imageHeight: 80,
//       customClass: {image: 'custom-image-delete'},
//       title: "Error",
//       text: "Not enough savings!"
//     });
//     return;
//   }

//   if (editId !== null) {
//     const index = transactions.findIndex(
//       (transaction) => transaction.id === editId
//     );
//     transactions[index] = {
//       id: editId,
//       category,
//       amount: expenseAmount,
//       month,
//     }; // Include the month
//     editId = null;
//     Swal.fire({
//       imageUrl: '../Images//tickk.png',
//       imageWidth: 80, 
//       imageHeight: 80,
//       customClass: {image: 'custom-image'},
//       title: "Success update!",
//       text: "Transaction updated successfully"
//     });
//   } else {
//     const transaction = {
//       id: Date.now(),
//       category,
//       amount: expenseAmount,
//       month,
//     }; // Include the month
//     transactions.push(transaction);
//     Swal.fire({
//       imageUrl: '../Images//tickk.png',
//       imageWidth: 80, 
//       imageHeight: 80,
//       customClass: {image: 'custom-image'},
//       title: "Transaction!",
//       text: "Transaction added successfully!"
//     });;
//   }

//   totalSaving -= expenseAmount;
//   totalIncome -= expenseAmount;
//   totalExpenses += expenseAmount;

//   updateUI();
//   transactionForm.reset();
// });

// // Delete Transaction Function
// function deleteTransaction(id) {
//   const transaction = transactions.find((t) => t.id === id);
//   if (transaction) {
//     totalSaving += transaction.amount;
//     totalIncome += transaction.amount;
//     totalExpenses -= transaction.amount;
//   }

//   transactions = transactions.filter((transaction) => transaction.id !== id);
//   updateUI();
// }

// // Edit Transaction Function
// function editTransaction(id) {
//   const transaction = transactions.find((transaction) => transaction.id === id);
//   transactionCategoryInput.value = transaction.category;
//   transactionAmountInput.value = transaction.amount;
//   document.getElementById("transaction-months").value = transaction.month; // Set the month in the form
//   editId = id;
// }

// // Delete Transaction Function with SweetAlert Confirmation
// function deleteTransaction(id) {
//   // Show a confirmation dialog using SweetAlert
//   Swal.fire({
//     title: "Are you sure?",
//     text: "Do you want to delete this transaction?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33",
//     cancelButtonColor: "#3085d6",
//     confirmButtonText: "Yes, delete it!",
//     cancelButtonText: "Cancel",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // If the user confirmed, delete the transaction
//       const transaction = transactions.find((t) => t.id === id);
//       if (transaction) {
//         totalSaving += transaction.amount;
//         totalIncome += transaction.amount;
//         totalExpenses -= transaction.amount;
//       }

//       transactions = transactions.filter(
//         (transaction) => transaction.id !== id
//       );
//       updateUI(); // Update the UI after deletion

//       // Show a success message
//       Swal.fire({
//         imageUrl: '../Images//tickk.png',
//         imageWidth: 80, 
//         imageHeight: 80,
//         customClass: {image: 'custom-image'},
//         title: "Deleted!",
//         text: "Your transaction has been deleted"
//       });
//     }
//   });
// }




  // Account Page Script: Store transactions and totals in localStorage

  // // References to DOM elements
  // const transactionForm = document.getElementById('transaction-form');
  // const transactionCategoryInput = document.getElementById('transaction-category');
  // const transactionAmountInput = document.getElementById('transaction-amount');
  // const transactionMonthInput = document.getElementById('transaction-months');
  // const transactionList = document.getElementById('transaction-list');
  // const totalSavingElem = document.getElementById('total-saving');
  // const totalIncomeElem = document.getElementById('total-income');
  // const totalExpensesElem = document.getElementById('total-expenses');

  // let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  // let savings = JSON.parse(localStorage.getItem('savings')) || 0;

  // // Handle transaction form submission
  // transactionForm.addEventListener('submit', (event) => {
  //   event.preventDefault();

  //   const category = transactionCategoryInput.value;
  //   const amount = parseFloat(transactionAmountInput.value);
  //   const month = transactionMonthInput.value;

  //   if (category && !isNaN(amount) && amount > 0 && month) {
  //     const transaction = {
  //       id: Date.now(),  // Unique ID for the transaction
  //       category,
  //       amount,
  //       month
  //     };

  //     // Add transaction to local storage
  //     transactions.push(transaction);
  //     localStorage.setItem('transactions', JSON.stringify(transactions));

  //     // Reset the form and update the transaction table
  //     transactionForm.reset();
  //     updateTransactionTable();
  //     updateTotals();
  //     SweetAlert("Transaction added successfully!", "success");
  //   } else {
  //     SweetAlert("Please fill in all fields correctly.", "error");
  //   }
  // });

  // // Update the transaction table
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
  //       <td>
  //         <button class="btn-remove" onclick="removeTransaction(${transaction.id})">Remove</button>
  //       </td>
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

  // // Remove transaction from localStorage
  // function removeTransaction(id) {
  //   transactions = transactions.filter((transaction) => transaction.id !== id);
  //   localStorage.setItem('transactions', JSON.stringify(transactions));
  //   updateTransactionTable();
  //   updateTotals();
  //   SweetAlert("Transaction removed successfully!", "success");
  // }

  // // Update totals for savings, income, and expenses
  // function updateTotals() {
  //   let totalIncome = 0;
  //   let totalExpenses = 0;

  //   transactions.forEach((transaction) => {
  //     if (transaction.amount > 0) {
  //       totalIncome += transaction.amount;
  //     } else {
  //       totalExpenses += transaction.amount;
  //     }
  //   });

  //   totalIncomeElem.textContent = `$${totalIncome.toFixed(2)}`;
  //   totalExpensesElem.textContent = `$${totalExpenses.toFixed(2)}`;
  //   totalSavingElem.textContent = `$${savings.toFixed(2)}`;
  // }

  // // Add saving functionality
  // function addSaving() {
  //   const savingInput = document.getElementById('saving-input');
  //   const addSavingBtn = document.getElementById('add-saving-btn');
  //   const cancelSavingBtn = document.getElementById('cancel-saving-btn');
  //   const savingInputContainer = document.getElementById('saving-input-container');

  //   addSavingBtn.addEventListener('click', () => {
  //     const savingAmount = parseFloat(savingInput.value);
  //     if (!isNaN(savingAmount) && savingAmount > 0) {
  //       savings += savingAmount;
  //       localStorage.setItem('savings', JSON.stringify(savings));
  //       savingInputContainer.style.display = 'none';
  //       SweetAlert(`You have successfully added $${savingAmount.toFixed(2)} to your savings!`, "success");
  //       updateTotals();
  //     } else {
  //       SweetAlert("Please enter a valid amount.", "error");
  //     }
  //   });

  //   cancelSavingBtn.addEventListener('click', () => {
  //     savingInputContainer.style.display = 'none';
  //   });
  // }

  // // SweetAlert function
  // function SweetAlert(message, icon) {
  //   Swal.fire({
  //     title: message,
  //     icon: icon,
  //     confirmButtonText: 'OK',
  //   });
  // }

  // // Initialize the table and totals on page load
  // updateTransactionTable();
  // updateTotals();
  // addSaving();

  // // Show saving input container when the "Add Saving" button is clicked
  // const showInputBtn = document.getElementById('show-input-btn');
  // showInputBtn.addEventListener('click', () => {
  //   document.getElementById('saving-input-container').style.display = 'block';
  // });





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

  // Function to update UI
  function updateUI() {
    totalSavingElement.textContent = `$${totalSaving.toFixed(2)}`;
    totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;

    // Clear transaction list
    transactionList.innerHTML = "";

    // Populate transaction list
    transactions.forEach((transaction) => {
      const row = document.createElement("tr");

      // Display category, amount, and month in the table
      row.innerHTML = `
        <td>${transaction.category}</td> <!-- Category -->
        <td>$${transaction.amount.toFixed(2)}</td> <!-- Amount -->
        <td>${getMonthName(transaction.month)}</td> <!-- Display the month -->
        <td>
          <button class="btn edit-btn" onclick="editTransaction(${
            transaction.id
          })">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn delete-btn" onclick="deleteTransaction(${
            transaction.id
          })">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      `;

      transactionList.appendChild(row); // Append to the table
    });
  }

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
        imageUrl: "../Images/tickk.png",
        imageWidth: 80,
        imageHeight: 80,
        customClass: { image: "custom-image" },
        title: "Success!",
        text: "Saving added successfully!",
      });
    } else {
      // Show error message
      Swal.fire({
        imageUrl: "../Images/delete.png",
        imageWidth: 80,
        imageHeight: 80,
        customClass: { image: "custom-image-delete" },
        title: "Error",
        text: "Please enter a valid saving amount",
      });
    }
  });

  // Expense Submission Function
  transactionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const expenseAmount = parseFloat(transactionAmountInput.value);
    const category = transactionCategoryInput.value;
    const month = transactionMonthInput.value; // Get selected month

    if (!category || isNaN(expenseAmount) || expenseAmount <= 0 || !month) {
      Swal.fire({
        imageUrl: "../Images/delete.png",
        imageWidth: 80,
        imageHeight: 80,
        customClass: { image: "custom-image-delete" },
        title: "Error",
        text: "Please fill in all fields correctly",
      });
      return;
    }

    if (expenseAmount > totalSaving) {
      Swal.fire({
        imageUrl: "../Images/delete.png",
        imageWidth: 80,
        imageHeight: 80,
        customClass: { image: "custom-image-delete" },
        title: "Error",
        text: "Not enough savings!",
      });
      return;
    }

    if (editId !== null) {
      const index = transactions.findIndex(
        (transaction) => transaction.id === editId
      );
      transactions[index] = {
        id: editId,
        category,
        amount: expenseAmount,
        month,
      }; // Include the month
      editId = null;
      Swal.fire({
        imageUrl: "../Images/tickk.png",
        imageWidth: 80,
        imageHeight: 80,
        customClass: { image: "custom-image" },
        title: "Success update!",
        text: "Transaction updated successfully",
      });
    } else {
      const transaction = {
        id: Date.now(),
        category,
        amount: expenseAmount,
        month,
      }; // Include the month
      transactions.push(transaction);
      Swal.fire({
        imageUrl: "../Images/tickk.png",
        imageWidth: 80,
        imageHeight: 80,
        customClass: { image: "custom-image" },
        title: "Transaction!",
        text: "Transaction added successfully!",
      });
    }

    totalSaving -= expenseAmount;
    totalIncome -= expenseAmount;
    totalExpenses += expenseAmount;

    // Save updated data to localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("totalSaving", totalSaving);
    localStorage.setItem("totalIncome", totalIncome);
    localStorage.setItem("totalExpenses", totalExpenses);

    updateUI();
    transactionForm.reset();
  });

  // Edit Transaction Function
  function editTransaction(id) {
    const transaction = transactions.find((transaction) => transaction.id === id);
    transactionCategoryInput.value = transaction.category;
    transactionAmountInput.value = transaction.amount;
    transactionMonthInput.value = transaction.month; // Set the month in the form
    editId = id;
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

        Swal.fire({
          imageUrl: "../Images/tickk.png",
          imageWidth: 80,
          imageHeight: 80,
          customClass: { image: "custom-image" },
          title: "Deleted!",
          text: "Your transaction has been deleted",
        });
      }
    });
  }

  // Initialize UI
  updateUI();

