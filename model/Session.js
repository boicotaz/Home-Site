const Sequelize = require("sequelize");
const sequelize = require("../services/sqlService");

var sessionModelDefinition = {
  session_id: {
    type: Sequelize.STRING(128),
    allowNull: false,
    primaryKey: true
  },
  expires: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  data: {
    type: Sequelize.TEXT,
    defaultValue: null
  },
  persists: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
};

let SessionModelOptions = {
  timestamps: false,
  paranoid: true
};

const SessionModel = sequelize.define(
  "session",
  sessionModelDefinition,
  SessionModelOptions
);

SessionModel.prototype.getSessionId = function() {
  return this.getDataValue("session_id");
};

SessionModel.prototype.getSessionExpires = function() {
  return this.getDataValue("expires");
};

SessionModel.prototype.getSessionData = function() {
  return this.getDataValue("data");
};

SessionModel.findSessionBySessionId = function(sessionId) {
  return this.findAll({ where: { session_id: sessionId } });
};

SessionModel.deleteSessionById = function(sessionId) {
  return this.destroy({ where: { session_id: sessionId }, force: true });
};
SessionModel.updatePersistsById = function(sessionId) {
  return this.update({ persists: true }, { where: { session_id: sessionId } });
};

SessionModel.findSessionsByPersists = function(persists) {
  return this.findAll({ where: { persists: persists } });
};

// SessionModel.findAll().then(res => console.log(res));
// SessionModel.findSessionsByPersists();
module.exports = SessionModel;
