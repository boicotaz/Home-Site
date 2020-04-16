let getGroupMessages = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/home/get-group-messages",
      method: "GET",
      dataType: "json",
      success: function(groupMessages) {
        console.log("get group message data:", groupMessages);
        resolve(groupMessages);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
};

let storeNewMessage = function(newMsg) {
  console.log(newMsg);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/home/store-group-message",
      method: "POST",
      dataType: "json",
      data: newMsg,
      success: function(status) {
        console.log("store new msg status", status);
        resolve(status);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
};

let groupMessagesAjax = {};
groupMessagesAjax.getGroupMessages = getGroupMessages;
groupMessagesAjax.storeNewMessage = storeNewMessage;

export { groupMessagesAjax };
