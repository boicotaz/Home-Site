const Sequelize = require("sequelize");
const sequelize = require("../services/sqlService");
const expenseModel = require("./Expense");
const userModel = require("../model/User");

var TransactionModelDefinition = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoincrement: true
  },
  expenseId: {
    type: Sequelize.INTEGER,
    references: {
      model: "expense",
      key: "id"
    }
  },
  creditor: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id"
    }
  },
  debtor: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id"
    }
  },
  debt: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
};

var TransactionModelOptions = {
  timestamps: false
};

const TransactionModel = sequelize.define(
  "transactions",
  TransactionModelDefinition,
  TransactionModelOptions
);

TransactionModel.prototype.getTransactionId = function() {
  return this.getDataValue("id");
};

TransactionModel.prototype.getExpenseId = function() {
  return this.getDataValue("expenseId");
};

TransactionModel.prototype.getCreditor = function() {
  return this.getDataValue("creditor");
};

TransactionModel.prototype.getDebtor = function() {
  return this.getDataValue("debtor");
};

TransactionModel.prototype.getDebt = function() {
  return this.getDataValue("debt");
};

TransactionModel.createTransaction = function(expenseId, creditorId, debtor) {
  return this.create({
    expenseId: expenseId,
    creditor: creditorId,
    debtor: debtor.id,
    debt: debtor.debt
  });
};

TransactionModel.findAllTransactionsByExpenseId = function(expenseId) {
  return this.findAll({ where: { expenseId: expenseId } });
};

module.exports = TransactionModel;
