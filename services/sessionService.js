"use strict";
const sessionModel = require("../model/Session");

class SessionService {
  constructor() {
    this.sessionModel = sessionModel;
  }

  findSessionBySessionId(sessionId) {
    return this.sessionModel.findSessionBySessionId(sessionId);
  }

  deleteSessionById(sessionId) {
    return this.sessionModel.deleteSessionById(sessionId);
  }

  updatePersistsById(sessionId) {
    return this.sessionModel.updatePersistsById(sessionId);
  }
  findSessionsByPersists(persists) {
    return this.sessionModel.findSessionsByPersists(persists);
  }
}

module.exports = SessionService;
