```javascript
const income = 50000;

let expenses = [
    {
        category: "Food",
        description: "Lunch",
        amount: 200,
        date: new Date().toLocaleDateString()
    },
    {
        category: "Entertainment",
        description: "Movie",
        amount: 500,
        date: new Date().toLocaleDateString()
    },
    {
        category: "Travel",
        description: "Cab",
        amount: 300,
        date: new Date().toLocaleDateString()
    }
];

function formatMoney(amount) {
    return "₹" + amount.toLocaleString("en-IN");
}

const categories = [
    "Food",
    "Entertainment",
    "Travel",
    "Other"
];

const chartCanvas = document.getElementById("expenseChart");

let expenseChart = null;

if (window.Chart && chartCanvas) {
    expenseChart = new Chart(chartCanvas, {
        type: "doughnut",

        data: {
            labels: categories,

            datasets: [{
                data: [200, 500, 300, 0],

                backgroundColor: [
                    "#00e5ff",
                    "#ffbf47",
                    "#50f0a0",
                    "#a78bfa"
                ],

                borderColor: "#06172f",
                borderWidth: 3
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: "bottom",

                    labels: {
                        color: "#ffffff",
                        padding: 20
                    }
                }
            }
        }
    });
} else {
    console.error(
        "Chart.js load nahi hua. Internet connection check karo."
    );
}

function updateChart() {
    if (!expenseChart) return;

    expenseChart.data.datasets[0].data =
        categories.map(function(category) {
            return expenses
                .filter(function(expense) {
                    return expense.category === category;
                })
                .reduce(function(total, expense) {
                    return total + expense.amount;
                }, 0);
        });

    expenseChart.update();
}

function updateDashboard() {
    const totalExpense = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

    const today = new Date().toLocaleDateString();

    const todayTotal = expenses
        .filter(expense => expense.date === today)
        .reduce((total, expense) => total + expense.amount, 0);

    document.getElementById("totalIncome").textContent =
        formatMoney(income);

    document.getElementById("todayExpense").textContent =
        formatMoney(todayTotal);

    document.getElementById("remainingBalance").textContent =
        formatMoney(income - totalExpense);

    const transactionList =
        document.getElementById("transactionList");

    transactionList.innerHTML = "";

    expenses.slice().reverse().forEach(function(expense) {
        const row = document.createElement("tr");

        [
            expense.category,
            expense.description,
            formatMoney(expense.amount),
            expense.date
        ].forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        transactionList.appendChild(row);
    });

    updateChart();
}

document.getElementById("addExpenseBtn").addEventListener(
    "click",
    function() {
        const categoryInput = prompt(
            "Enter category: Food, Entertainment, Travel, Other"
        );

        if (!categoryInput) return;

        const category = categories.find(function(item) {
            return item.toLowerCase() ===
                categoryInput.trim().toLowerCase();
        });

        if (!category) {
            alert("Please enter a valid category.");
            return;
        }

        const description = prompt("Enter expense description");

        if (!description || !description.trim()) return;

        const amount = Number(prompt("Enter expense amount"));

        if (!Number.isFinite(amount) || amount <= 0) {
            alert("Please enter a valid positive amount.");
            return;
        }

        const totalExpense = expenses.reduce(
            (total, expense) => total + expense.amount,
            0
        );

        if (amount > income - totalExpense) {
            alert("Expense exceeds your remaining balance.");
            return;
        }

        expenses.push({
            category: category,
            description: description.trim(),
            amount: amount,
            date: new Date().toLocaleDateString()
        });

        updateDashboard();
    }
);

updateDashboard();
```