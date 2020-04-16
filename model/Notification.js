const Sequelize = require("sequelize");
const sequelize = require("../services/sqlService");

let NotificationModelDefinition = {
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
  details: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  createdAt: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    // allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

let NotificationModelOptions = {
  timestamps: false
};

const NotificationModel = sequelize.define(
  "notification",
  NotificationModelDefinition,
  NotificationModelOptions
);

NotificationModel.prototype.getNotificationId = function() {
  return this.getDataValue("id");
};

NotificationModel.prototype.getGroupId = function() {
  return this.getDataValue("groupId");
};

NotificationModel.prototype.getUserId = function() {
  return this.getDataValue("userId");
};

NotificationModel.prototype.getDetails = function() {
  return this.getDataValue("details");
};

NotificationModel.prototype.getType = function() {
  return this.getDataValue("type");
};

NotificationModel.prototype.getCreatedAt = function() {
  return this.getDataValue("createdAt");
};

NotificationModel.getGroupNotifications = function(groupId) {
  return this.findAll({ where: { groupId: groupId } });
};

NotificationModel.storeNotification = function(notification) {
  return this.create(notification);
};

module.exports = NotificationModel;
