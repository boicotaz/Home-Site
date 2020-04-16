"use strict";
const NotificationModel = require("../model/Notification");

function getNotificationService() {
  return new NotificationService(NotificationModel);
}

class NotificationService {
  constructor(NotificationModel) {
    this.NotificationModel = NotificationModel;
  }

  getGroupNotifications(groupDetails) {
    return this.NotificationModel.getGroupNotifications(groupDetails.groupId);
  }

  storeNotification(notification) {
    return this.NotificationModel.storeNotification(notification);
  }
}

module.exports = getNotificationService;
