const logInController = require('express').Router();
const passport = require("passport");
const SessionService = require('../services/sessionService');
const sessionService = new SessionService();
const userService = require('../services/userService')();

logInController.get("/", async (req, res) => {

    if ( req.cookies['auth_logged'] != undefined && req.isAuthenticated()) {
        if (req.cookies['auth_logged'] == 'yes') {
            if (req.cookies['remember_me'] != undefined) {
                sessionService.findSessionBySessionId(req.cookies['remember_me']).then(session => {
                    if (Array.isArray(session) && session.length) {

                        let sessionDataJsonString = session[0].getSessionData();
                        let sessionData = JSON.parse(sessionDataJsonString);
                        let userId = sessionData.passport.user;

                        if (userId == req.user.id) {
                            if (req.cookies['remember_me'] != req.sessionID) {
                                sessionService.deleteSessionById(req.cookies['remember_me']);
                                res.clearCookie('remember_me');
                                res.cookie('remember_me', req.sessionID, { path: '/', httpOnly: true, maxAge: 604800000, secure: true }); // TO DO: sortain the age
                                sessionService.updatePersistsById(req.sessionID);
                                sessionService.deleteSessionById(req.cookies['remember_me']);
                            }
                        }
                    }
                })
            }
            else {
                sessionService.updatePersistsById(req.sessionID);
                res.cookie('remember_me', req.sessionID, { path: '/', httpOnly: true, maxAge: 604800000, secure: true }); // TO DO: sortain the age
            }
        }
        if (req.cookies['auth_logged'] != undefined)
            res.clearCookie('auth_logged');

        res.redirect('/home');
    }
    else if (req.isAuthenticated()) {
        res.redirect('/home');
    }
    else if (req.cookies['remember_me'] != undefined) {

        sessionService.findSessionBySessionId(req.cookies['remember_me']).then(session => {

            if (session == null || session == undefined) res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
            if (Array.isArray(session) && session.length) {
                let sessionDataJsonString = session[0].getSessionData();
                let sessionData = JSON.parse(sessionDataJsonString);

                let userId = sessionData.passport.user;
                if (userId != undefined) {
                    userService.getUserById(userId).then(user => {
                        if (req.cookies['remember_me'] != req.sessionID) {
                            sessionService.deleteSessionById(req.cookies['remember_me']);
                            res.clearCookie('remember_me');
                            res.cookie('remember_me', req.sessionID, { path: '/', httpOnly: true, maxAge: 604800000, secure: true }); // TO DO: sortain the age

                            sessionService.updatePersistsById(req.sessionID);
                            sessionService.deleteSessionById(req.cookies['remember_me']);
                        }
                        req.login(user, () => {
                            res.redirect('/home');
                        });
                    });

                }
                else {
                    res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
                }

            }
            else {
                res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
            }
        }).catch(e => {
            console.log(e);
            res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
        })


    }
    else {
        res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
    }

});

logInController.get('/google-auth', (req, res, next) => {

    if (req.query.remember_me == 'yes') {
        res.cookie('login_remember_me', 'yes', { path: '/google-auth/callback', httpOnly: true, maxAge: 604800, secure: true });
    }
    next();

}, passport.authenticate('google', {
    scope: ['profile', 'email']
}));


logInController.get('/facebook-auth', (req, res, next) => {

    if (req.query.remember_me == 'yes') {
        res.cookie('login_remember_me', 'yes', { path: '/facebook-auth/callback', httpOnly: true, maxAge: 604800, secure: true });
    }
    next();

}, passport.authenticate('facebook', {
    scope: ['email']
}));


logInController.get('/google-auth/callback', passport.authenticate('google'), (req, res) => {
    let remember_me = 'no'
    if (req.cookies['login_remember_me']) {
        remember_me = 'yes';
        res.clearCookie('login_remember_me');
    };
    res.cookie('auth_logged', remember_me, { path: '/', httpOnly: true, maxAge: 604800000, secure: true }); // TO DO: sortain the age

    res.redirect('/');
});

logInController.get('/facebook-auth/callback', passport.authenticate('facebook'), (req, res) => {
    let remember_me = 'no'
    if (req.cookies['login_remember_me']) {
        remember_me = 'yes';
        res.clearCookie('login_remember_me');
    };
    res.cookie('auth_logged', remember_me, { path: '/', httpOnly: true, maxAge: 604800000, secure: true }); // TO DO: sortain the age

    res.redirect('/');
});


logInController.post('/validate', function (req, res, next) {

    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        else if (!user) {
            return res.render("sign-in-room8s.ejs", { user: false, userAlreadyExists: null, mail: null });
        }
        else {
            req.logIn(user, async function (err) {
                if (err) { return next(err); }
                if (req.body.remember_me == 'on') {
                    if (req.cookies['remember_me'] != undefined) {
                        res.clearCookie('remember_me');
                    }
                    res.cookie('remember_me', req.sessionID, { path: '/', httpOnly: true, maxAge: 604800000, secure: true }); // TO DO: sortain the age
                    sessionService.updatePersistsById(req.sessionID);
                }
                else {
                    if (req.cookies['remember_me'] != undefined) {
                        res.clearCookie('remember_me');
                    }
                }
                return res.redirect('/home');
            });
        }

    })(req, res, next);
});

module.exports = logInController;