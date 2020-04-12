const homeController = require('express').Router();
const passportService = require('../services/passportService');
const groupService = require('../services/groupService')();
const messageService = require('../services/messageService')();

const SessionService = require('../services/sessionService');
const sessionService = new SessionService();
const userService = require('../services/userService')();

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
        req.user.usersInGroup = usersInGroup;
        req.user.groupId = "DYNO";
        res.render("main.ejs", { userHasGroup: true, user: req.user, groupName: groupName })
    }

});

homeController.post("/add-user-in-group", function (req, res, next) { 
    let userToAddInGroupData = req.body;
    userService.getUserByName(userToAddInGroupData.newUserData.fullName).then((userToAdd) => {
        groupService.addUserToGroup(userToAdd.getUserId(), userToAddInGroupData.groupDetails).then(res.json(userToAdd));
    });
})


//  @route      DELETE home/delete-user-from-group
//  @desc       Remove user from his group
//  @access     Private

homeController.delete("/delete-user-from-group", (req, res) =>{
    console.log('delete control action')
    try {
        const {fullName} = req.body;
        console.log(fullName);
        userService.getUserByName(fullName)
        .then((user)=>{
            groupService.deleteUserFromGroup(user.id)
            //console.log(user.dataValues);
        
        })
        res.status(200).send("Delete was succesfull! ")
    } catch (err) {
        console.error(err.message);
        res.status(500).send({msg:"Server Error"})   
    }

    
})


homeController.get("/get-group-messages", passportService.authValidation, async (req, res) => {


    group = await groupService.findGroupByUserId(req.user.id);

    messageService.getGroupMessages(group.getGroupId()).then(groupMessages => {
        res.json(groupMessages);
    });

})

homeController.post("/store-group-message", passportService.authValidation, async (req, res) => {
    let newMsg = req.body;
    messageService.storeNewGroupMessage(newMsg);
})

module.exports = homeController;