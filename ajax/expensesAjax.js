// Ajax request to retrieve the data needed to create the expense table
let getExpenseDataAjax = function (userNames, skip) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/home/expenses/get-expense-table',
            method: 'GET',
            dataType: "json",
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }

        })
    });

}

// Ajax request to retrieve the TOTALS data needed to create the expense TOTALS table
let getExpenseTotalsDataAjax = function () {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/home/expenses/get-expense-totals-table',
            method: 'GET',
            dataType: "json",
            success: function (data) {
                resolve(data);
                console.log('this should the totals table state: ', data);
            },
            error: function (error) {
                reject(error);
            }

        })
    });

}


//Pass the data to backend so it will store them in our db
let storeNewExpense = function (postData, newExpense, clientSocket, currentUser) {
    $.ajax({
        url: '/home/expenses/create-expense',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(postData),
        contentType: "application/json",
        // contentType: "application/json",
        success: function (result) {
            $("#created-expense-success").show(function () {
                new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        $('#created-expense-success').hide(800);
                        $('#darkModalForm').modal('toggle');
                        let clearExpenseFormEvent = new CustomEvent('clear-expense-form');
                        document.dispatchEvent(clearExpenseFormEvent);
                        resolve({ msg: 'ok' });
                    }, 3000);
                })
            })

            let newExpenseDetails = {};
            newExpenseDetails.newExpense = newExpense;
            newExpenseDetails.currentUser = currentUser;

            clientSocket.emit('new-expense', newExpenseDetails);
        },
        error: function (error) {
            console.log(error);
        }

    });
}

// Creates the expense table by using the ExpensesTable Component
let processData = function (expenses, usersInGroupDetails) {
    console.log("in  process data", expenses, usersInGroupDetails);
    if (Array.isArray(expenses)) {
        expenses.forEach(expense => {
            if (Array.isArray(expense)) {
                expense.forEach(transaction => {
                    transaction.creditorFullName = usersInGroupDetails.get(parseInt(transaction.creditor, 10)).firstName + " " + usersInGroupDetails.get(parseInt(transaction.creditor, 10)).lastName;
                    transaction.debtorFullName = usersInGroupDetails.get(parseInt(transaction.debtor, 10)).firstName + " " + usersInGroupDetails.get(parseInt(transaction.debtor, 10)).lastName;
                })
            }
            else {
                expense.creditorFullName = usersInGroupDetails.get(parseInt(expense.creditor, 10)).firstName + " " + usersInGroupDetails.get(parseInt(expense.creditor, 10)).lastName;
                expense.debtorFullName = usersInGroupDetails.get(parseInt(expense.debtor, 10)).firstName + " " + usersInGroupDetails.get(parseInt(expense.debtor, 10)).lastName;
            }
        });
    }
    else {
        expenses.creditorFullName = usersInGroupDetails.get(parseInt(expenses.creditor, 10)).firstName + " " + usersInGroupDetails.get(parseInt(expenses.creditor, 10)).lastName;
        expenses.debtorFullName = usersInGroupDetails.get(parseInt(expenses.debtor, 10)).firstName + " " + usersInGroupDetails.get(parseInt(expenses.debtor, 10)).lastName;
    }

    return expenses;

}

let expensesAjax = {};

expensesAjax.storeNewExpense = storeNewExpense;
expensesAjax.getExpenseTotalsDataAjax = getExpenseTotalsDataAjax;
expensesAjax.getExpenseDataAjax = getExpenseDataAjax;
expensesAjax.processData = processData;


export { expensesAjax }