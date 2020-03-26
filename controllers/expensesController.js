var expensesController = require('express').Router();
var authValidation = require('../services/passportService').authValidation;
var groupService = require('../services/groupService')();
const userService = require('../services/userService')();
const transactionService = require('../services/transactionService')();
const expenseService = require('../services/expenseService')();
// const userService = require('../services/userService')();

expensesController.get('/', authValidation, function (req, res, next) {
    res.render('expenses.ejs', { user: req.user });
});

expensesController.post('/create-expense', authValidation, function (req, res, next) {

    let { creditor, debtors, info } = req.body;
    groupService.findGroupByUserId(creditor.id).then(group => expenseService.createExpense({ groupId: group.getGroupId(), description: info.desc, createdAt: info.date, sum: creditor.credit }, function (expense, isCreated) {
        if (isCreated) {
            transactionService.createTransactions(expense.getExpenseId(), creditor.id, debtors);
            res.json({ data: req.body, expenseId: expense.getExpenseId() });
        }
        else {
            res.json({ "message": "failed to create expense object" });
        }
    }));
});


expensesController.get('/get-expense-table', authValidation, async function (req, res, next) {
    groupService.findGroupByUserId(req.user.id).then((group) => {
        getGroupExpenseTableData(group.getGroupId()).then(expensesData => res.json(expensesData));
    })

})

expensesController.get('/get-expense-totals-table', authValidation, function (req, res, next) {

    groupService.findGroupByUserId(req.user.id).then((group) => {

        let getUsersInGroupPromise = groupService.findUsersInGroup(group.getGroupId());
        let getGroupExpenseTableDataPromise = getGroupExpenseTableData(group.getGroupId());

        Promise.all([getUsersInGroupPromise, getGroupExpenseTableDataPromise]).then(data => {
            let usersInGroup = data[0];
            let groupExpenses = data[1];


            let fullNames = userService.createFullNameIdArray(usersInGroup);

            // totalExpenses struct { '1': { fullname: apostolis gerodimos, debtSum: 0, debts : {'8' : 15$ } } }
            // tolis owes 15$ to user 8
            let totalExpenses = {};
            for (let i = 0; i < fullNames.length; i++) {
                totalExpenses[fullNames[i].id] = { fullname: fullNames[i].fullname, debtSum: 0 }
                debts = {};
                for (let j = 0; j < fullNames.length; j++) {
                    if (i == j) continue;
                    debts[fullNames[j].id] = 0
                }
                totalExpenses[fullNames[i].id].debts = debts;
            }

            //loop though all expenses (tolis gave 10$ to maria and fillipas)
            groupExpenses.map(expenseEntry => {
                //break each expense to all transactions (maria owes 3$ to tolis, filippas owes 7$ to tolis)
                expenseEntry.map(transaction => {
                    let creditorId = transaction.creditor;
                    let debtorId = transaction.debtor;
                    let remainingDebt;
                    let CommonDebtsFlag;
                    let paidDebt;

                    if (creditorId == debtorId) return;

                    if (totalExpenses[creditorId].debts[debtorId] > 0) { // does tolis owes any money to maria, from a past expense? 
                        if (transaction.debt <= totalExpenses[creditorId].debts[debtorId]) { // is the debt enough to settle the current transaction ?
                            totalExpenses[creditorId].debts[debtorId] -= transaction.debt;
                            totalExpenses[debtorId].debts[creditorId] += transaction.debt;
                            return;
                        }
                        else { // settle up some of the debt
                            remainingDebt = transaction.debt - totalExpenses[creditorId].debts[debtorId];
                            CommonDebtsFlag = true;

                            paidDebt = totalExpenses[creditorId].debts[debtorId]
                            totalExpenses[creditorId].debts[debtorId] -= paidDebt;
                            totalExpenses[debtorId].debts[creditorId] += paidDebt;
                        }
                    }
                    else { // Maria doesnt owe money to tolis
                        remainingDebt = transaction.debt;
                        CommonDebtsFlag = true;
                    }

                    //check if we can settle the remaining debt with another user
                    while (remainingDebt > 0 && CommonDebtsFlag) {
                        // searchResut struct keeps the user that has related debts with current creditor and debtor
                        // weight shows how "good" is to use this user to settle the debts 
                        // "1": creditor owes to "key" user and "key" user owes to debtor
                        // "2": enough to settle up creditor but not settle up debtor
                        // "3": enough to settle the transaction
                        let searchResult = { userId: -1, weight: 0 }
                        paidDebt = 0;
                        //loop through all other Creditor debts, so we can settle up any related debts
                        Object.keys(totalExpenses[creditorId]).forEach((key, index) => {
                            // the user we are looking should have common debts with Creditor and Debtor
                            if (!key == debtorId) {
                                if (totalExpenses[key].debts[creditorId] < 0) { // user identified by "key" owes some money to our creditor
                                    if (totalExpenses[key].debts[debtorId] > 0) { //user with key to be of any use, he should at least owe some money to the debtor
                                        let userDebtValue = 1;
                                        if (totalExpenses[key].debts[creditorId] < (-1) * remainingDebt) userDebtValue = 2;
                                        if ((totalExpenses[key].debts[creditorId] < ((-1) * remainingDebt)) && totalExpenses[key].debts[debtorId] > remainingDebt) userDebtValue = 3;

                                        if (userDebtValue > searchResult.weight) {
                                            searchResult.userId = key;
                                            searchResult.weight = userDebtValue;
                                        }
                                    }
                                }
                            }
                        });

                        switch (searchResult.weight) {
                            case 0:
                                CommonDebtsFlag = false; // we couldnt find any user that has common debt
                                // update the remaining debt that need be settled bettween creditor and debtor
                                totalExpenses[creditorId].debts[debtorId] -= remainingDebt;
                                totalExpenses[debtorId].debts[creditorId] += remainingDebt;

                                break;
                            case 1:
                                // calculate the remainind debt
                                remainingDebt -= Math.abs(totalExpenses[searchResult.userId].debts[creditorId]);

                                // paid debt (positive)
                                paidDebt = Math.abs(totalExpenses[searchResult.userId].debts[creditorId]);

                                // update the debt bettween the user, creditor, debtor
                                totalExpenses[creditorId].debts[searchResult.userId] -= paidDebt;
                                totalExpenses[searchResult.userId].debts[creditorId] += paidDebt;

                                totalExpenses[debtorId].debts[searchResult.userId] -= paidDebt;
                                totalExpenses[searchResult.userId].debts[debtorId] += paidDebt;
                                break;
                            case 2 || 3:
                                paidDebt = remainingDebt;
                                remainingDebt = 0;

                                // update the debt bettween the user, creditor, debtor
                                totalExpenses[creditorId].debts[searchResult.userId] -= paidDebt;
                                totalExpenses[searchResult.userId].debts[creditorId] += paidDebt;

                                totalExpenses[debtorId].debts[searchResult.userId] -= paidDebt;
                                totalExpenses[searchResult.userId].debts[debtorId] += paidDebt;
                                break;
                        }

                    }
                });
            });

            //Calculate the debt sum
            Object.keys(totalExpenses).forEach((key, index) => {
                Object.keys(totalExpenses[key].debts).forEach((innerKey, innerIndex) => {
                    totalExpenses[key].debtSum += totalExpenses[key].debts[innerKey];
                });
            });
            res.json(totalExpenses);
        });

    });


});

async function getGroupExpenseTableData(groupId) {

    return expenseService.findAllExpensesByGroupId(group.getGroupId()).then((expenses) => {

        var expensesData = expenses.map((expense) => {
            return transactionService.findAllTransactionsByExpenseId(expense.getExpenseId()).then((transactions) => {
                var trans_data = transactions.map(transaction => { return { creditor: transaction.getCreditor(), debtor: transaction.getDebtor(), when: expense.getDate(), description: expense.getDescription(), credit: expense.getSum(), debt: transaction.getDebt() } });
                return trans_data;
            });
        })

        return Promise.all(expensesData);
    })


}


module.exports = expensesController;