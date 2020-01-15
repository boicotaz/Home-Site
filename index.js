const express = require("express");
const app = express();
const server = require("http").createServer(app);
var io = require("./services/socketService")(server);
const bodyParser = require("body-parser");
var cors = require("cors");
var passport = require("passport");
var morgan = require("morgan");
const session = require("express-session");
const sessionStore = new session.MemoryStore();
const passportService = require("./services/passportService");
const signUpController = require("./controllers/signUpController");
const signOutController = require("./controllers/signOutController");
const expensesController = require("./controllers/expensesController");
const homeController = require('./controllers/homeContoller');

// Initialize server
server.listen(process.env.PORT || 8082, () => {
  console.log(`app is now listening to port ${process.env.PORT || 8082}`);
  console.log(__dirname);
});

// Hook up the HTTP logger.
app.use(morgan("dev"));

// Serve static files like css, images
app.use("/public", express.static(__dirname + "/public"));
app.use(cors());

//Be able to parse the body of requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create Session to be used by passport
app.use(
  session({
    secret: "sdfsdfasdfasdfasdfsdaasdasdfasd",
    resave: true,
    saveUninitialized: true,
    key: "express.sid",
    store: sessionStore,
    expires: new Date(Date.now() + (120 * 60 * 1000))
  })
);

// Init the passport.
app.use(passport.initialize());
app.use(passport.session());
passportService.passportConfigure(passport);

// Set render engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

//Sign-In page
app.get("/", (req, res) => {
  res.render("sign-in-room8s.ejs", { user: null, userAlreadyExists: null, mail: null });
});

//Home page
app.get("/home", homeController);

//Sign up page
app.use("/sign-up", signUpController);

//Sign out route
app.use("/sign-out", signOutController)

//expenses page
app.get("/home/expenses", expensesController);

const userService = require('./services/userService')();
const groupService = require('./services/groupService')();

app.post("/add-user-in-group", function (req, res, next) {
  userService.getUserIdbyEmail(req.body.value).then((userToAddId) => {
    let userInGroupId = req.body['user[id]'];
    groupService.addUserToGroup(userToAddId, userInGroupId, function (wasCreated, groupUsers) {
      if (wasCreated) {
        console.log('create group ok');
        groupUsers.then(group => res.json({ group: group }));

      }
      else {
        console.log('create group fail');
      }
    });

  });


})



app.post('/validate', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return res.render("sign-in-room8s.ejs", { user: false, userAlreadyExists: null, mail: null });
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/home');
    });
  })(req, res, next);
});



