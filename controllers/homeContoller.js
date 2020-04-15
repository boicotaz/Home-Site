/** Express router providing home routes
 * @module homeController
 * @requires passportService
 * @requires groupService
 * @requires messageService
 * @requires sessionService
 * @requires userService
 */


const homeController = require('express').Router();
const passportService = require('../services/passportService');
const groupService = require('../services/groupService')();
const messageService = require('../services/messageService')();
const SessionService = require('../services/sessionService');
const sessionService = new SessionService();
const userService = require('../services/userService')();

/**
 * 
 * Renders the homepage depending if user has group or not
 * @name GET /
 * @function
 * @param {string} path - /home
 * @param {callback} middleware - Passport Validation
 * @param {callback} function
 *    
 */

homeController.get("/", passportService.authValidation, async (req, res, next) => {

    let group = await groupService.findGroupByUserId(req.user.id);

    if (group == null || !group) {
        res.render("main.ejs", { userHasGroup: false, user: req.user, groupName: null });
    }
    else {
        groupId = group.getGroupId();
        const [usersInGroup, groupName] = await Promise.all([
            groupService.findUsersInGroup(groupId), // online user count
            groupService.getGroupNameByGroupId(groupId), // register user
        ]);
        //auto giati?
        req.user.usersInGroup = usersInGroup;
        req.user.groupId = "DYNO";
        //
        res.render("main.ejs", { userHasGroup: true, user: req.user, groupName: groupName })
    }

});

/**
 * 
 * Adds user in a group
 * @name  POST /add-user-in-group
 * @function
 * @param {string} path - /add-user-in-group
 * @param {callback} function
 *
 *     
 */

homeController.post("/add-user-in-group", function (req, res, next) {
    let userToAddInGroupData = req.body
    userService.getUserByName(userToAddInGroupData.newUserData.fullName).then((userToAdd) => {
        groupService.addUserToGroup(userToAdd.getUserId(), userToAddInGroupData.groupDetails).then(res.json(userToAdd));
    });
})

/**
 * 
 * Returns all group messages
 * @name GET /get-group-messages
 * @function
 * @param {string} path - /get-group-messages
 * @param {callback} middleware - Passport Validation
 * @param {callback} function    
 */

homeController.get("/get-group-messages", passportService.authValidation, async (req, res) => {


    group = await groupService.findGroupByUserId(req.user.id);

    messageService.getGroupMessages(group.getGroupId()).then(groupMessages => {
        res.json(groupMessages);
    });

})

/**
 * 
 * Stores all group messages
 * @name POST /store-group-message
 * @function
 * @param {string} path - /store-group-message
 * @param {callback} middleware - Passport Validation
 * @param {callback} function     
 */
homeController.post("/store-group-message", passportService.authValidation, async (req, res) => {
    let newMsg = req.body;
    messageService.storeNewGroupMessage(newMsg);
})

module.exports = homeController;