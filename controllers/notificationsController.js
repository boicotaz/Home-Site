const notificationsController = require("express").Router();
const notificationService = require("../services/notificationService")();

notificationsController.post("/get-group-notifications", async function(
  req,
  res,
  next
) {
  // notificationService.findGroupByUserId(req.user.id).then((group) => {
  //     getGroupExpenseTableData(group.getGroupId()).then(notificationsData => res.json(notificationsData));
  // });
  console.log(
    "--____________________________________________In notifications controller________________________________________--",
    req.body
  );
  // res.json({res: "ok"});
  let groupDetails = req.body;
  notificationService
    .getGroupNotifications(groupDetails)
    .then(groupNotifications => {
      res.json(groupNotifications);
    });
});

notificationsController.post("/add-notification", async function(
  req,
  res,
  next
) {
  // notificationService.findGroupByUserId(req.user.id).then((group) => {
  //     getGroupExpenseTableData(group.getGroupId()).then(notificationsData => res.json(notificationsData));
  // });
  // console.log("--____________________________________________In notifications controller________________________________________--", req.body);
  // res.json({res: "ok"});
  // let groupDetails = req.body;
  let notification = req.body;
  notificationService
    .storeNotification(notification)
    .then(storedNotification => {
      res.json(storedNotification);
    });
});

module.exports = notificationsController;
