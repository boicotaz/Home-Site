const express = require("express");
const app = express();
require('dotenv').config();
// const server = require("http").createServer(app);

const fs = require('fs');
const options = {
  key: fs.readFileSync(process.env.SERVER_KEY),
  cert: fs.readFileSync(process.env.SERVER_CERT)
};
const server = require("https").createServer(options, app);
var io = require("./services/socketService")(server);
const bodyParser = require("body-parser");
var cors = require("cors");
var passport = require("passport");
var morgan = require("morgan");
const session = require("express-session");

const passportService = require("./services/passportService");
const signUpController = require("./controllers/signUpController");
const signOutController = require("./controllers/signOutController");
const expensesController = require("./controllers/expensesController");
const homeController = require('./controllers/homeContoller');
const apiController = require('./controllers/apiController');
const logInController = require('./controllers/logInController');
const notificationsController = require('./controllers/notificationsController');

// Initialize server
server.listen(process.env.PORT || 8082, process.env.SERVER_IP, () => {
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

// Add Express Cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// Create Session to be used by passport

// Add Sql Session MemoryStore
const MySQLStore = require('express-mysql-session')(session);


let sqlOptions = {
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  user: process.env.SQL_USER,
  password: process.env.SQL_USER_PASSWORD,
  database: process.env.SQL_DATABASE
}

let sessionStore = new MySQLStore(sqlOptions);

app.use(
  session({
    key: process.env.EXPRESS_SESSION_KEY,
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: true,
      httpOnly: true,
      // expires: true,
      // maxAge: 5000
    }

  })
);

// Init the passport...
app.use(passport.initialize());
app.use(passport.session());
passportService.passportConfigure(passport);


// Set render engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
let User = require('./model/User');

//Log-in page
app.use("/", logInController);

//Home page
app.use("/home", homeController);

//Sign up page
app.use("/sign-up", signUpController);

//Sign out route
app.use("/sign-out", signOutController)

//expenses page
app.use("/home/expenses", expensesController);

//notifications api
app.use("/notifications", notificationsController);

//get api services
app.use('/api', apiController);

// refresh handle

app.get('/*', function (req, res) {
  res.redirect('/home');
});


const webpush = require('web-push');

const publicVapidKey = 'BMKMaCxQjf2NtwfODDDx5wCBW51kMsomozcyvFK_O1NUjyS8xspuZDPoKOEMXZoPxS3g5dAvFNxUNpWkvBRqjV4'
const privateVapidKey = 'PBDKERhv9kEHJhOBPGrD2rcHRM_BtTvuHMXEbkDJq9g'

webpush.setVapidDetails('mailto:tolisgerodimos94@gmail.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
  // Get pushSubsription object
  const subscription = req.body;

  // Send 201 - resource created;
  res.status(201).json({});

  //Create payload
  const payload = JSON.stringify({ title: 'Push Test', hiddenData: 'Specific parameters for action' });

  //Pass object into SendNotification
  webpush.sendNotification(subscription, payload).catch(error => console.error(error))
})

