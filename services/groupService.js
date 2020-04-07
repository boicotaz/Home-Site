"use strict"
const groupModel = require('../model/Group');

function getGroupService() {
    var groupService = new GroupService(groupModel);
    return groupService;
}

class GroupService {
    constructor(groupModel) {
        this.groupModel = groupModel;
    }

    async findGroupByUserId(userId) {
        return this.groupModel.findGroupByUserId(userId);
    }

    async findUsersInGroup(groupId) {
        return this.groupModel.findUsersInGroup(groupId);
    }
    async getGroupNameByGroupId(groupId) {
        return this.groupModel.getGroupNameByGroupId(groupId);
    }

    async addUserToGroup(userToAddId, groupDetails) {
        return this.groupModel.addUserToGroup(groupDetails, userToAddId);
    }

    //@@ todo deleteUserFromGroup, maybe async isnt needed here!
    async deleteUserFromGroup(userId) {
        // console.log('Delete user from group service!');
        // console.log(userId) exoume to user id = 20
        return this.groupModel.deleteUserFromGroup(userId);
    }
}

module.exports = getGroupService;