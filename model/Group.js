const Sequelize = require('sequelize');
const sequelize = require('../services/sqlService');
const userModel = require('../model/User');

var groupModelDefinition = {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
};

var groupModelOptions = {
    timestamps: false
};

const GroupModel = sequelize.define('groups', groupModelDefinition, groupModelOptions);
GroupModel.userModel = userModel;

GroupModel.prototype.getGroupId = function getGroupId() {
    return this.getDataValue('id');
}

GroupModel.prototype.getGroupName = function getGroupId() {
    return this.getDataValue('name');
}

GroupModel.prototype.getGroupUserId = function getGroupId() {
    return this.getDataValue('user_id');
}

GroupModel.findUsersInGroup = async function (groupId) {

    let groups = await this.findAll({ attributes: ['user_id'], where: { id: groupId } })
        .then((groupId) => { return groupId });
    let userIds = groups.map((group) => { return group.getGroupUserId() });

    return this.userModel.findAll({ where: { id: { [Sequelize.Op.in]: userIds } } });

}

GroupModel.findGroupByUserId = async function (userId) {
    return this.findOne({ where: { id: userId } }).then(group => {
        if (group) {
            return group.getGroupId();
        }
        else {
            return null;
        }
    });

}

module.exports = GroupModel;