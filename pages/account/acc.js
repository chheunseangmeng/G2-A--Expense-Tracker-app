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


// Update UI with Checkbox Event (When Clicked, Deduct from Savings/Income)
function updateUI() {
  totalSavingElement.textContent = `$${totalSaving.toFixed(2)}`;
  totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
  totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;

  transactionList.innerHTML = "";

  transactions.forEach((transaction) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input type="checkbox" class="category-checkbox" data-id="${transaction.id}" ${transaction.deducted ? 'checked' : ''}></td>
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

    // Add event listener to checkbox
    const checkbox = row.querySelector(".category-checkbox");
    checkbox.addEventListener("change", (event) => {
      const isChecked = event.target.checked;
      const transactionId = event.target.dataset.id;
      const transaction = transactions.find((t) => t.id === transactionId);

      if (isChecked && !transaction.deducted) {
        // Deduct from savings and income when checked
        totalSaving -= transaction.amount;
        totalIncome -= transaction.amount;
        transaction.deducted = true; // Mark as deducted
      } else if (!isChecked && transaction.deducted) {
        // Add back to savings and income when unchecked
        totalSaving += transaction.amount;
        totalIncome += transaction.amount;
        transaction.deducted = false; // Mark as not deducted
      }

      // Save updated data to localStorage
      localStorage.setItem("transactions", JSON.stringify(transactions));
      localStorage.setItem("totalSaving", totalSaving);
      localStorage.setItem("totalIncome", totalIncome);

      // Update UI
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


// Expense Submission Function
transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const expenseAmount = parseFloat(transactionAmountInput.value);
  const category = transactionCategoryInput.value;
  const month = transactionMonthInput.value;

  if (!category || isNaN(expenseAmount) || expenseAmount <= 0 || !month) {
    Swal.fire({
      imageUrl: "../../image/delete.png",
      imageWidth: 80,
      imageHeight: 80,
      customClass: { image: "custom-image-delete" },
      title: "Error",
      text: "Please fill in all fields correctly",
    });
    return;
  }

  // Add expense to table but don't subtract from saving/income yet
  const transaction = {
    id: Date.now(),
    category,
    amount: expenseAmount,
    month,
  };

  transactions.push(transaction);

  // Save updated data to localStorage without affecting savings/income
  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateUI();
  transactionForm.reset();
});

// Update UI to display checkbox for each expense
function updateUI() {
  totalSavingElement.textContent = `$${totalSaving.toFixed(2)}`;
  totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
  totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;

  transactionList.innerHTML = "";

  transactions.forEach((transaction) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><input type="checkbox" class="category-checkbox" data-id="${transaction.id}"></td>
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

    // Add checkbox event listener to subtract from saving/income when checked
    const checkbox = row.querySelector(".category-checkbox");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        totalSaving -= transaction.amount;
        totalIncome -= transaction.amount;
        totalExpenses += transaction.amount;

        // Save updated data to localStorage after checkbox is checked
        localStorage.setItem("totalSaving", totalSaving);
        localStorage.setItem("totalIncome", totalIncome);
        localStorage.setItem("totalExpenses", totalExpenses);

        updateUI(); // Update UI to reflect new totals
      }
    });

    transactionList.appendChild(row);
  });
}



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
        imageUrl: "../../image/tickk.png",
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





