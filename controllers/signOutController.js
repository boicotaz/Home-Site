var signOutController = require("express").Router();
var userService = require("../services/userService")();
const SessionService = require("../services/sessionService");
const sessionService = new SessionService();
var authValidation = require("../services/passportService").authValidation;
signOutController.get("/", authValidation, function(req, res, next) {
  if (req.cookies["remember_me"] != undefined) {
    res.clearCookie("remember_me");
  }
  req.logout();
  sessionService.findSessionBySessionId(req.sessionID).then(results => {
    sessionService.deleteSessionById(req.sessionID);
  });

  res.redirect("/");
});

signOutController.get("/window_close", authValidation, function(
  req,
  res,
  next
) {
  if (!req.remember_me) {
    if (req.cookies["remember_me"] != undefined) {
      res.clearCookie("remember_me");
    }
    req.logout();
  }
});

module.exports = signOutController;
