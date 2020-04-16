"use strict";
const expenseModel = require("../model/Expense");

function getExpenseService() {
  return new ExpenseService(expenseModel);
}

class ExpenseService {
  constructor(expenseModel) {
    this.expenseModel = expenseModel;
  }

  async createExpense(options, done) {
    options.groupId = parseInt(options.groupId);
    options.sum = parseFloat(options.sum);
    if (options.createdAt == "") options.createdAt = null;
    if (options.description == "") options.description = null;
    this.expenseModel.createExpense(options, done);
  }

  async findAllExpensesByGroupId(groupId) {
    return this.expenseModel.findAllExpensesByGroupId(groupId);
  }
}

module.exports = getExpenseService;
