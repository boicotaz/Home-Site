"use strict";
const transactionModel = require("../model/Transaction");

function getTransactionService() {
  return new TransactionService(transactionModel);
}

class TransactionService {
  constructor(transactionModel) {
    this.transactionModel = transactionModel;
  }
  async createTransactions(expenseId, creditorId, debtors) {
    var data;
    let transactions = debtors.map(debtor =>
      this.transactionModel.createTransaction(
        parseInt(expenseId),
        parseInt(creditorId),
        debtor
      )
    );
    Promise.all(transactions).then(results => {
      console.log("create trans results are", results);
      data = results;
    });
    return data;
  }

  async findAllTransactionsByExpenseId(expenseId) {
    return this.transactionModel.findAllTransactionsByExpenseId(expenseId);
  }
}

module.exports = getTransactionService;
