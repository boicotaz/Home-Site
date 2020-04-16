"use strict";
const messageModel = require("../model/Message");

function getMessageService() {
  return new MessageService(messageModel);
}

class MessageService {
  constructor(messageModel) {
    this.messageModel = messageModel;
  }

  getGroupMessages(groupId) {
    return this.messageModel.getGroupMessages(groupId);
  }

  storeNewGroupMessage(newMsg) {
    this.messageModel.storeNewGroupMessage(newMsg);
  }
}

module.exports = getMessageService;
