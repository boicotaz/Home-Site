var apiController = require('express').Router();
var groupService = require('../services/groupService')();
var userService = require('../services/userService')();
const multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, "profImg_user" + req.user.id + "_.png")
    }
});

const upload = multer({
    storage: storage
});

apiController.post('/get-users-in-group', function (req, res) {
    let user
    if (!req.body) user = req.body;
    else user = req.user;
    groupService.findGroupByUserId(user.id).then((group) => {
        groupService.findUsersInGroup(group.getGroupId()).then((users) => {
            // let userNamesAndIds = users.map(userInGroup => [userInGroup.firstName, userInGroup.lastName, userInGroup.id, userInGroup.profImgExists]);
            let groupUsersDetails = new Map();
            users.forEach(user=> {
                groupUsersDetails.set(user.id, {firstName: user.firstName, lastName : user.lastName, profImgExists: user.profImgExists, userId: user.id });
            });
            let groupUsersDetailsString = JSON.stringify([...groupUsersDetails]);
            res.send(groupUsersDetailsString);  
        });
    })
});

apiController.get('/get-current-user', function (req, res) {
    res.json(req.user);
});


apiController.get('/get-users', function (req, res) {
    userService.getAllUsers().then(results => res.json(results))
})

apiController.get('/get-group-details', function (req, res) {
    console.log('_______________________request for group details by user with id: ', req.user.id, '___________________________');
    groupService.findGroupByUserId(req.user.id).then(group => res.json({ groupName: group.getGroupName(), groupId: group.getGroupId() }));
})

apiController.post('/post-profile-img', upload.single('profileImg'), (req, res) => {
    userService.updateProfImg(req.user.id, true);
    res.json(req.user);
})

module.exports = apiController;