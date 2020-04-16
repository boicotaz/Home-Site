const Sequelize = require("sequelize");
const sequelize = require("../services/sqlService");
const userModel = require("../model/User");
const groupModel = require("../model/Group");
const transactionModel = require("./Transaction");

var expenseModelDefinition = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "group",
      key: "id"
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  sum: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
};

var ExpenseModelOptions = {
  timestamps: false
};

const ExpenseModel = sequelize.define(
  "expenses",
  expenseModelDefinition,
  ExpenseModelOptions
);

ExpenseModel.prototype.getExpenseId = function() {
  return this.getDataValue("id");
};

ExpenseModel.prototype.getGroupId = function() {
  return this.getDataValue("groupId");
};

ExpenseModel.prototype.getDescription = function() {
  return this.getDataValue("description");
};

ExpenseModel.prototype.getDate = function() {
  return this.getDataValue("createdAt");
};

ExpenseModel.prototype.getSum = function() {
  return this.getDataValue("sum");
};

ExpenseModel.createExpense = function(options, done) {
  console.log(options.createdAt);
  this.create(options).then(expense => {
    if (!expense) {
      return done(null, false);
    } else {
      return done(expense, true);
    }
  });
};

ExpenseModel.findAllExpensesByGroupId = function(groupId) {
  return this.findAll({ where: { groupId: groupId } });
};

module.exports = ExpenseModel;
