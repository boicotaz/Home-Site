const Sequelize = require('sequelize');
const sequelize = require('../services/sqlService');
const bcrypt = require('bcrypt');

var userModelDefinition = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: Sequelize.BIGINT
    },
    birthDate: {
        type: Sequelize.DATEONLY
    },
    gender: {
        type: Sequelize.STRING
    },
    profImgExists: {
        type: Sequelize.BOOLEAN
    },
    googleId: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    facebookId: {
        type: Sequelize.STRING,
        defaultValue: null
    }
};

var userModelOptions = {
    // instanceMethods: {
    //     comparePasswords: comparePasswords
    // },
    hooks: {
        // beforeValidate: hashPassword,
        beforeCreate: hashPassword
    },

    timestamps: false
};

const UserModel = sequelize.define('users', userModelDefinition, userModelOptions);


// Compares two passwords.
UserModel.prototype.comparePasswords = function comparePasswords(password, callback) {
    // console.log(password, this.password);
    bcrypt.compare(password, this.password, function (error, isMatch) {
        // console.log(isMatch);
        if (error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}
UserModel.prototype.getUserId = function getUserId() {
    return this.getDataValue('id');
}

UserModel.prototype.getUserFirstName = function getUserName() {
    return this.getDataValue('firstName');
}

UserModel.prototype.getUserLastName = function getUserName() {
    return this.getDataValue('lastName');
}

// Hashes the password for a user object.
function hashPassword(user) {
    if (user.password == null) return null;
    if (user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function (password) {
            user.password = password;
        });
    }
    else {
        return bcrypt.hash(user.password, 10).then(function (password) {
            // console.log('password from hash is: ', password);
            // console.log(user.password);
            user.password = password;
        });
    }
}

UserModel.getUserIdbyEmail = async function (email) {
    return this.findOne({ where: { email: email } }).then((user) => { console.log(user.getUserId()); return user.getUserId() })

}
UserModel.getUserByName = async function (name) {
    return this.findOne({ where: { firstName: name[0], lastName: name[1] }, attributes: { exclude: ['password'] } });
}

UserModel.getUserById = function (userId) {
    return this.findOne({ where: { id: userId }, attributes: { exclude: ['password'] } });
}

UserModel.getAllUsers = async function () {
    return await UserModel.findAll({ attributes: { exclude: ['password'] } }).then((users) => {
        let userNamesAndIds = users.map((user) => { return [user.firstName + " " + user.lastName, user.id] });
        return userNamesAndIds
    });
}

UserModel.updateProfImg = function (userId, profileImgFlag) {
    return this.update({ profImgExists: profileImgFlag }, { where: { id: userId } });
}

UserModel.getUserByGoogleId = function (googleId) {
    return this.findOne({ where: { googleId: googleId }, attributes: { exclude: ['password'] } });
}

UserModel.getUserByFacebookId = function (facebookId) {
    return this.findOne({ where: { facebookId: facebookId }, attributes: { exclude: ['password'] } });
}

UserModel.getUserbyEmail = function (email) {
    return this.findOne({ where: { email: email }, attributes: { exclude: ['password'] } });
}

UserModel.updateGoogleId = function (googleId, userId) {
    return this.update({ googleId: googleId }, { where: { id: userId } });
}

UserModel.updateFacebookId = function (facebookId, userId) {
    return this.update({ facebookId: facebookId }, { where: { id: userId } });
}

UserModel.createUserWithGoogleAuth = function (options) {
    return this.create(options);
}
UserModel.createUserWithFacebookAuth = function (options) {
    return this.create(options);
}

module.exports = UserModel;