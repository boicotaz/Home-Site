const Sequelize = require("sequelize");
const sequelize = require("../services/sqlService");

let MessageModelDefinition = {
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
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id"
    }
  },
  messageText: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  timeSent: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false
  }
};

let MessageModelOptions = {
  timestamps: false
};

const MessageModel = sequelize.define(
  "message",
  MessageModelDefinition,
  MessageModelOptions
);

MessageModel.prototype.getMessageId = function() {
  return this.getDataValue("id");
};

MessageModel.prototype.getGroupId = function() {
  return this.getDataValue("groupId");
};

MessageModel.prototype.getUserId = function() {
  return this.getDataValue("userId");
};

MessageModel.prototype.getMessageText = function() {
  return this.getDataValue("messageText");
};

MessageModel.prototype.getTimeSent = function() {
  return this.getDataValue("timeSent");
};

MessageModel.getGroupMessages = function(groupId) {
  return this.findAll({
    where: { groupId: groupId },
    attributes: { exclude: ["id", "groupId"] }
  });
};

MessageModel.storeNewGroupMessage = function(newMsg) {
  // console.log(options.createdAt);
  this.create(newMsg).then(message => {
    console.log(message);
  });
};

// MessageModel.storeMessaege({ groupId: 1, userId: 8, messageText: "another message" })

module.exports = MessageModel;
