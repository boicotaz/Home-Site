const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
var User = require("./../model/User.js");
const userService = require("./userService")();

function passportConfigure(passport) {
  passport.serializeUser((user, done) => {
    console.log("serialize routine with user id = " + user.id);
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    console.log("deserialize routine with key: " + id);
    User.findOne({
      where: { id: id },
      attributes: { exclude: ["password"] }
    }).then(user => done(null, user));
  });
  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (username, password, done) => {
        potentialUser = { where: { email: username } };
        User.findOne(potentialUser)
          .then(function(user, error) {
            if (!user) {
              return done(null, false);
            } else if (error) {
              return done(error);
            } else {
              user.comparePasswords(password, function(error, isMatch) {
                console.log(isMatch, error);
                if (isMatch && !error) {
                  return done(null, user);
                } else {
                  return done(null, false);
                }
              });
            }
          })
          .catch(function(error) {
            // res.status(500).json({ message: "There was an error!" });
            console.log(error);
          });
      }
    )
  );
  const googleStrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/google-auth/callback"
  };
  const googleVerifyCallback = async (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    console.log(profile);
    console.log("email is :___________-", profile.emails[0].value);
    Promise.all([
      userService.getUserByGoogleId(profile.id),
      userService.getUserbyEmail(profile.emails[0].value)
    ]).then(res => {
      let [userByGoogleId, userByEmail] = res;
      if (userByGoogleId) {
        done(null, userByGoogleId);
      } else if (userByEmail) {
        userService.updateGoogleIdById(profile.id, userByEmail.id);
        done(null, userByGoogleId);
      } else {
        let options = {};
        if (profile.name.givenName) {
          options.firstName = profile.name.givenName;
        } else {
          options.firstName = "NoFirstName";
        }

        if (profile.name.familyName) {
          options.lastName = profile.name.familyName;
        } else {
          options.lastName = "NoLastName";
        }

        options.googleId = profile.id;
        options.email = profile.emails[0].value;
        userService
          .createUserWithGoogleAuth(options)
          .then(newUser => done(null, newUser));
      }
    });
  };
  passport.use(new GoogleStrategy(googleStrategyOptions, googleVerifyCallback));

  // Facebook Auth
  const facebookStrategyOptions = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/facebook-auth/callback",
    profileFields: ["id", "displayName", "name", "emails"]
  };
  const facebookVerifyCallback = async (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    console.log(profile);
    console.log("email is :___________-", profile.emails[0].value);
    Promise.all([
      userService.getUserByFacebookId(profile.id),
      userService.getUserbyEmail(profile.emails[0].value)
    ]).then(res => {
      let [userByFacebookId, userByEmail] = res;
      if (userByFacebookId) {
        done(null, userByFacebookId);
      } else if (userByEmail) {
        userService.updateFacebookIdById(profile.id, userByEmail.id);
        done(null, userByGoogleId);
      } else {
        let options = {};
        if (profile.name.givenName) {
          options.firstName = profile.name.givenName;
        } else {
          options.firstName = "NoFirstName";
        }

        if (profile.name.familyName) {
          options.lastName = profile.name.familyName;
        } else {
          options.lastName = "NoLastName";
        }

        options.facebookId = profile.id;
        options.email = profile.emails[0].value;
        userService
          .createUserWithFacebookAuth(options)
          .then(newUser => done(null, newUser));
      }
    });
  };

  passport.use(
    new FacebookStrategy(facebookStrategyOptions, facebookVerifyCallback)
  );

  return passport;
}

function authValidation(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.user.firstName);
    return next();
  } else {
    res.redirect("/");
  }
}

module.exports = { passportConfigure, authValidation };
