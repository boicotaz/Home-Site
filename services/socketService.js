var io = require("socket.io");
const groupService = require("./groupService")();
var sequenceNumberByClient = [];
const SessionService = require("../services/sessionService");
const sessionService = new SessionService();

function socketInit(server) {
  let serverSocket = io(server);

  serverSocket.on("connection", function(socket) {
    socket.on("get_logged_in_users", function(RequestorData) {
      console.log(
        "request for user logged in status submitted successfully",
        RequestorData
      );
      // socket.emit('sent_logged_in_users', sequenceNumberByClient);
      let userSocket;
      let loggedInData = [];
      console.log(
        "the sockets online up till now are:",
        sequenceNumberByClient
      );
      for (const [client, userInLoggedInList] of sequenceNumberByClient) {
        if (RequestorData.usersInGroupId.includes(userInLoggedInList.id)) {
          // client.emit('user_in_my_group_added_expense', data);
          loggedInData.push(userInLoggedInList.id);
        }
        if (RequestorData.currentUserId == userInLoggedInList.id)
          userSocket = client;
      }

      console.log("Users online seem to be ====", loggedInData, userSocket.id);
      userSocket.emit("sent_logged_in_users", loggedInData);
    });

    socket.on("user_connected", function(user) {
      sequenceNumberByClient.push([socket, user]);
      console.log("a user connected with socket id: ", socket.id);
      groupService.findGroupByUserId(user.id).then(group => {
        if (!group) return;
        groupService.findUsersInGroup(group.getGroupId()).then(users => {
          let usersIdInGroup;
          usersIdInGroup = users.map(user => user.id);
          let clientSockets = [];
          let userNamesThatAreLoggedIn = [];

          for (const [client, userInLoggedInList] of sequenceNumberByClient) {
            if (usersIdInGroup.includes(userInLoggedInList.id)) {
              // let userNameThatisLoggedIn = [];
              clientSockets.push(client);
              // userNameThatisLoggedIn.push(userInLoggedInList.firstName);
              // userNameThatisLoggedIn.push(userInLoggedInList.lastName);
              // userNameThatisLoggedIn.push(userInLoggedInList.id);
              userNamesThatAreLoggedIn.push(userInLoggedInList.id);
            }
          }

          clientSockets.map(clientSocket =>
            clientSocket.emit(
              "user_in_my_group_connected",
              userNamesThatAreLoggedIn
            )
          );
        });
      });
    });

    socket.on("broadcastNewGroupMessage", function(newMsgDetails) {
      console.log(
        "I RECEIVED REQUEST FOR BROADCAST_______________________________________________",
        newMsgDetails
      );

      for (const [client, userInLoggedInList] of sequenceNumberByClient) {
        if (newMsgDetails.groupUsersIds.includes(userInLoggedInList.id)) {
          client.emit("newGroupMessageReceived", {
            message: newMsgDetails.message,
            currentUserId: newMsgDetails.currentUserId
          });
        }
      }
    });

    /**
     * @typedef userDetails 
     * @type {Array}
     * @property {number}  - userDetails[0] = userId
     * @property {object} userInfo - userDetails[1]
     * @property {String} userInfo.firstName 
     * @property {String} userInfo.lastName
     * @property {Boolean} userInfo.profImgExists 
     * @property {number} userInfo.userId
     */

    /**
     * @param {Array<userDetails>} usersInGroup - the details we need to update usersInGroup 
     */
    socket.on("refresh-users-in-group-details", function(
      refreshUsersInGroupEventDetails
    ) {
      console.log(
        "caught refresh event with even data",
        refreshUsersInGroupEventDetails
      );

      let usersInGroup = refreshUsersInGroupEventDetails.usersInGroup;

      usersInGroupIds = usersInGroup.map(userInGroup => {
        return userInGroup[0];
      });

      for (const [client, userInLoggedInList] of sequenceNumberByClient) {
        // client.emit('user_changed_photo', userDetails);
        if (usersInGroupIds.includes(userInLoggedInList.id)) {
          client.emit(
            "refresh-users-in-group-details",
            refreshUsersInGroupEventDetails
          );
        }
      }
    });

    socket.on("new-expense", function(newExpenseDetails) {
      groupService
        .findGroupByUserId(newExpenseDetails.currentUser.id)
        .then(group => {
          groupService.findUsersInGroup(group.getGroupId()).then(users => {
            let usersIdInGroup;
            usersIdInGroup = users.map(user => user.id);

            for (const [client, userInLoggedInList] of sequenceNumberByClient) {
              if (usersIdInGroup.includes(userInLoggedInList.id)) {
                client.emit(
                  "user_in_my_group_added_expense",
                  newExpenseDetails
                );
              }
            }
          });
        });
    });

    socket.on("userChangedPhoto", function(userDetails) {
      console.log(
        " IMG CHANGED BY_______________________________-",
        userDetails.userId
      );
      for (const [client, userInLoggedInList] of sequenceNumberByClient) {
        client.emit("user_changed_photo", userDetails);
      }
    });
    socket.on("disconnect", () => {
      console.log("user disconnected with socket id: ", socket.id);
      // each socket is per tab so we need to dinstiguish bettween close tab and user logout
      let socketsCountForMaybeDisconnectedUser = 0;
      for (const [client, userInLoggedInList] of sequenceNumberByClient) {
        console.log(client.id, userInLoggedInList.id);
        if (socket.id == client.id) {
          // we found the disconnected socket id
          let disconnectedClient = client;
          let disconnectedUser = userInLoggedInList;

          for (const [
            innerClient,
            innerUserLoggedInList
          ] of sequenceNumberByClient) {
            if (innerUserLoggedInList.id == disconnectedUser.id) {
              socketsCountForMaybeDisconnectedUser++;
              if (socketsCountForMaybeDisconnectedUser > 1) break;
            }
          }

          sequenceNumberByClient = sequenceNumberByClient.filter(elem => {
            let thisSocket = elem[0];
            if (thisSocket.id != disconnectedClient.id) return elem;
          });

          if (socketsCountForMaybeDisconnectedUser == 1) {
            // user had only one client socket. So he did disconnect.
            disconnectUser(disconnectedUser);
          }
          break;
        }
      }
    });
  });
  return serverSocket;
}

let cleanUpUserSessions = async function(disconnectedUser, sessionService) {
  let persistsFlag = false;
  sessionService.findSessionsByPersists(persistsFlag).then(sessions => {
    sessions.forEach(session => {
      let sessionDataJsonString = session.getSessionData();
      let sessionData = JSON.parse(sessionDataJsonString);
      let sessionUserId = sessionData.passport.user;
      let disconnectedUserId = disconnectedUser.id;

      let sessionId = session.getSessionId();
      if (sessionUserId == disconnectedUserId) {
        sessionService.deleteSessionById(sessionId);
      }
    });
  });
};

let disconnectUser = function(disconnectedUser) {
  cleanUpUserSessions(disconnectedUser, sessionService);

  groupService.findGroupByUserId(disconnectedUser.id).then(group => {
    if (!group) return;
    groupService.findUsersInGroup(group.getGroupId()).then(users => {
      usersIdInGroup = users.map(user => user.id);

      for (const [
        clientSocket,
        clientSocketAttachedUser
      ] of sequenceNumberByClient) {
        if (usersIdInGroup.includes(clientSocketAttachedUser.id)) {
          clientSocket.emit(
            "user_in_my_group_disconnected",
            disconnectedUser.id
          );
        }
      }
    });
  });
};

module.exports = socketInit;
