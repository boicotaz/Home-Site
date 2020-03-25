
"use strict"
const UserModel = require('../model/User');

function getUserService() {
    var userService = new UserService(UserModel);
    return userService;
}

class UserService {

    constructor(userModel) {
        this.userModel = userModel;
    }

    createUser(options, done) {
        this.userModel.findOne({ where: { email: options.email } }).then((user) => {
            if (user != null) {
                return done(false, user);
            }
            else {
                options.phoneNumber = parseInt(options.phoneNumber);
                if (options.birthDate == '') options.birthDate = null;
                this.userModel.create(options).then(function (user) {
                    return done(true, user);
                })
            }
        });
    };

    async getUserIdbyEmail(email) {
        return this.userModel.getUserIdbyEmail(email);
    }

    getUserById(userId) {
        return this.userModel.getUserById(userId);
    }

    createUserWithGoogleAuth(options){
       return this.userModel.createUserWithGoogleAuth(options).then( () => { return this.getUserbyEmail(options.email)}  );
    } 

    getUserbyEmail(email){
        return this.userModel.getUserbyEmail(email);
    }

    updateGoogleIdById(googleId, userId){
        return this.userModel.updateGoogleId(googleId, userId);
    }

    async getUserIdbyName(name) {
        return this.userModel.getUserIdbyName(name.split(" "));
    }

    async getAllUsers() {
        return this.userModel.getAllUsers();
    }

    updateProfImg(userId, profileImgFlag) {
        return this.userModel.updateProfImg(userId, profileImgFlag);
    }

    getUserByGoogleId(googleId) {
        return this.userModel.getUserByGoogleId(googleId);
    }

    createFullNameIdArray(users) {
        return users.map(user => {
            return { id: user.getUserId(), fullname: user.getUserFirstName() + " " + user.getUserLastName() }
        });
    }
}


module.exports = getUserService;