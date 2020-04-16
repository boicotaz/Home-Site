let getAllUsers = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/api/get-users",
      type: "GET",
      success: function(returnedData) {
        resolve(returnedData);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
};

let getCurrentUser = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/api/get-current-user",
      type: "GET",
      success: function(currentUser) {
        resolve(currentUser);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
};

let userAjax = {};
userAjax.getAllUsers = getAllUsers;
userAjax.getCurrentUser = getCurrentUser;
export { userAjax };
