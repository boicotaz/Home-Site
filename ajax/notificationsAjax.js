// To Do: Comments
let getGroupNotifications = function getGroupNotifications(groupDetails) {
    // let userDetails = {};
    // userDetails.currentUser = currentUser;
    // userDetails.groupDetails = groupDetails;

    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/notifications/get-group-notifications',
            type: 'POST',
            data: JSON.stringify(groupDetails),
            contentType: "application/json",
            success: function (notifications) {
                console.log("notifications returned from controller are: ", notifications);
                resolve(notifications);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

let storeNotification = function storeNotification(notification) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/notifications/add-notification',
            type: 'POST',
            data: JSON.stringify(notification),
            contentType: "application/json",
            success: function (storedNotification) {
                console.log("_________notifications returned from STORE controller are: ", storedNotification);
                resolve(storedNotification);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}

let notificationsAjax = {};

notificationsAjax.getGroupNotifications = getGroupNotifications;
notificationsAjax.storeNotification = storeNotification;

export { notificationsAjax }