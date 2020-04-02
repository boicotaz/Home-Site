var evt = new CustomEvent('buttons-created', { state: "done" })

let getGroupDetails = function getGroupDetails() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/get-group-details',
            type: 'GET',
            success: function (groupDetails) {
                resolve(groupDetails);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

/**
 * @typedef userDetails 
 * @type {Object}
 * @param {String} userDetails.firstName 
 * @param {String} userDetails.lastName
 * @param {Boolean} userDetails.profImgExists 
 * @param {Integer} userDetails.userId
 */

/**
 * @typedef groupUsersDetails
 * @type {Map<Integer:userDetails>}
 * Key is userId
 */

/**
 * @return {Promise<groupUsersDetails>}
 */

let getUsersInGroupDetails = function getUsersInGroupDetails() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/api/get-users-in-group',
            type: 'POST',
            success: function (usersInGroupData) {
                window.dispatchEvent(evt);

                usersInGroupData = JSON.parse(usersInGroupData);

                let groupUsersDetails = new Map();
                for (let userData of usersInGroupData) {
                    groupUsersDetails.set(userData[0], userData[1]);
                }

                resolve(groupUsersDetails);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

let addUserInGroup = (newUserFullName, groupDetails, usersInGroup, currentUser) => {
    let postData = { newUserData: newUserFullName, groupDetails: groupDetails };

    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/home/add-user-in-group',
            type: 'POST',
            data: JSON.stringify(postData),
            contentType: "application/json",
            success: function (newGroupUser) {
                // window.dispatchEvent(evt);

                console.log("#####_____ADDED USER _____####", newGroupUser);
                grouDetailsAjax.getUsersInGroupDetails().then(updatedGroupUsersDetails => {
                    console.log('addd user in group - users in group', updatedGroupUsersDetails);
                    usersInGroup = Array.from(updatedGroupUsersDetails);

                    let refreshUsersInGroupEventDetails = {};
                    refreshUsersInGroupEventDetails.usersInGroup = usersInGroup;
                    refreshUsersInGroupEventDetails.currentUser = currentUser;

                    socket.emit('refresh-users-in-group-details', refreshUsersInGroupEventDetails);
                    $('#user-added-success').show((e) => {
                        setTimeout(function () {
                            $('#addUserForm').modal('toggle');
                            $('#add-user-in-group-field').val("");
                            $('#user-added-success').hide();

                        }, 3000);
                    });
                });
                // socket.emit("new-group-user-added", usersInGroup);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}
let grouDetailsAjax = {};

grouDetailsAjax.getGroupDetails = getGroupDetails;
grouDetailsAjax.getUsersInGroupDetails = getUsersInGroupDetails;
grouDetailsAjax.addUserInGroup = addUserInGroup;
export { grouDetailsAjax }