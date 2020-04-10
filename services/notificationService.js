"use strict"
const NotificationModel = require('../model/Notification');

function getNotificationService() {
    return new NotificationService(NotificationModel);
}


class NotificationService {
    constructor(NotificationModel){
        this.NotificationModel = NotificationModel;
    }

    getGroupNotifications(groupId) {
        return this.NotificationModel.getGroupNotifications(groupId);
    }

    storeNewGroupNotification(newMsg) {
        this.NotificationModel.storeNewGroupNotification(newMsg);
    }
};

module.exports = getNotificationService;