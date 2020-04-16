var Sequelize = require("sequelize");
("mysql://pr:tolis@192.168.1.7:3306/home_site");
const sequelize = new Sequelize(
  "mysql://" +
    process.env.SQL_USER +
    ":" +
    process.env.SQL_USER_PASSWORD +
    "@" +
    process.env.SQL_HOST +
    ":" +
    process.env.SQL_PORT +
    "/" +
    process.env.SQL_DATABASE
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
