"use strict";

const CONSUMER_KEY = "qTCtiZU6bLXzGnWUapZxRak7WjkN3O7TgP6inD7C";
const CONSUMER_SECRET = "V9xv6kSpUmuC90xhHQ2spmj4xSge94Ui7OlRNLb4";
const Splitwise = require("splitwise");

class SplitwiseService {
  constructor() {
    this.splitwiseApi = Splitwise({
      consumerKey: CONSUMER_KEY,
      consumerSecret: CONSUMER_SECRET
    });
  }

  getExpensesByUserEmail(userId) {
    // this.splitwiseApi.getCurrentUser().then(console.log).catch(e => console.log(e));
    this.splitwiseApi
      .getGroup({ id: "9810782" })
      .then(console.log)
      .catch(e => console.log(e));
  }
}

function getsplitwiseService() {
  var splitwiseService = new SplitwiseService();
  return splitwiseService;
}

module.exports = getsplitwiseService;

// sw.getCurrentUser().then(console.log)
// sw.getFriends().then(console.log)
// sw.getGroups().then(console.log);
// sw.getExpenses({ group_id: '9810782' }).then(console.log);

// sw.getCurrentUser().then(console.log);
// sw.createFriend({ user_email: 'mplampla@mail.com', user_first_name: 'testName', user_last_name: 'boicotaz' }).then(console.log);

// sw.addUserToGroup({ group_id: '9810782', user_id: '30850852', first_name: 'testName', last_name: 'boicotaz', email: 'mplampla@mail.com' }).then(console.log);
