var signUpController = require('express').Router();
var userService = require('../services/userService')();
signUpController.get('/', function (req, res, next) {
    res.render('sign-up-room8s.ejs');
});

signUpController.post("/", function (req, res) {
    userService.createUser(req.body, function (isNewUser, user) {
        if (isNewUser) {
            res.render('sign-in-room8s', { user: user, userAlreadyExists: false })
        }
        else {
            res.render('sign-in-room8s', { user: user, userAlreadyExists: true })
        }
    });
})
module.exports = signUpController;