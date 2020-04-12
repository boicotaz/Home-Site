import NavigationBar from "./navbar/NavigationBarComponent.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Components
import MainPage from "./mainPage/MainPageComponent.jsx";
import ExpensesPage from "./expensesPage/ExpensesPageComponent.jsx"
//Ajax

import { expensesAjax } from "../ajax/expensesAjax"

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.groupDetails = this.props.groupDetails;
    this.state.groupMessages = this.props.groupMessages;
    this.state.currentUser = this.props.currentUser;
    this.state.loggedInMembersId = [];
    this.state.usersInGroup = this.props.usersInGroup;
    this.state.view = this.props.view;
    this.state.expenses = this.props.expenses;
    this.state.totals = this.props.totals;

    this.state.notifications = {};
    this.state.notifications.newNotificationsSum = 0;
    this.state.notifications.notificationAdded = false;

    document.addEventListener('updateMyNewMessage', e => {
      let newMsg = e.detail;
      this.setState({ groupMessages: [...this.state.groupMessages, newMsg] });
    });

    document.addEventListener('newGroupMessageReceived', e => {
      let newMsg = e.detail;
      console.log('the app component caught event');
      this.setState({ groupMessages: [...this.state.groupMessages, newMsg] });

    });

    document.addEventListener('refresh-users-in-group-details', (e) => {
      console.log('____ i received the refresh users event in app ___', e.detail);
      let refreshUsersInGroupEventDetails = e.detail;


      let usersInGroupArray = refreshUsersInGroupEventDetails.usersInGroup;
      let actionsUser = refreshUsersInGroupEventDetails.currentUser;

      let usersInGroupMap = new Map();
      for (let userInGroup of usersInGroupArray) {
        usersInGroupMap.set(userInGroup[0], userInGroup[1]);
      }

      let notifications = this.state.notifications;
      if (actionsUser.id != this.state.currentUser.id) {
        notifications.newNotificationsSum++;
        notifications.notificationAdded = true;
        document.getElementById("newNotificationSound").play();
      }


      this.setState({ usersInGroup: usersInGroupMap, notifications: notifications });
    });

    document.addEventListener('new-expense', e => {
      expensesAjax.getExpenseTotalsDataAjax().then(totalDebtsForEachUser => {
        let newExpense = expensesAjax.processData(e.detail.newExpense, this.state.usersInGroup);

        let notifications = this.state.notifications;
        if (e.detail.currentUser.id != this.state.currentUser.id) {
          notifications.newNotificationsSum++;
          notifications.notificationAdded = true;
          document.getElementById("newNotificationSound").play();
        }

        this.setState({ expenses: [...this.state.expenses, newExpense], totals: totalDebtsForEachUser, notifications: notifications });
      })
    });

    let usersInGroupId = [];

    for (let key of this.state.usersInGroup.keys()) {
      usersInGroupId.push(this.state.usersInGroup.get(key).userId);
    }

    document.addEventListener('LoggedOffStatus', e => {
      let loggedOffUserId = e.detail;
      if (this.state.loggedInMembersId) {
        if (this.state.loggedInMembersId.includes(loggedOffUserId)) {
          let loggedInMembersId = [];

          loggedInMembersId = this.state.loggedInMembersId.filter(userId => {
            if (userId != loggedOffUserId) {
              return userId;
            }
          });

          this.setState({ loggedInMembersId: loggedInMembersId })
        }
      }
    })

    if (getUserLoggedStatusEvent == undefined) {
      var getUserLoggedStatusEvent = new CustomEvent('LoggedInStatus', { detail: { currentUserId: this.state.currentUser.id, usersInGroupId: usersInGroupId } });

      document.addEventListener('LoggedInStatusReply', e => {
        this.setState({ loggedInMembersId: e.detail })
      });
    }
    document.dispatchEvent(getUserLoggedStatusEvent);

  }



  render() {
    console.log("APP STATE IS________________________-----___##############################", this.state);
    return (
      <React.Fragment>
        <BrowserRouter>

          <NavigationBar notifications={this.state.notifications}> </NavigationBar>

          <Switch>

            <Route path="/home" render={(props) => {
              return <MainPage  {...props} groupDetails={this.state.groupDetails} groupMessages={this.state.groupMessages} usersInGroup={this.state.usersInGroup} currentUser={this.state.currentUser} loggedInMembersId={this.state.loggedInMembersId}   > </MainPage>
            }} />

            <Route exact path="/expenses" render={(props) => {
              return <ExpensesPage
                {...props}
                view={this.state.view}
                expenses={this.state.expenses}
                totals={this.state.totals}
                usersInGroupDetails={this.state.usersInGroup}
                currentUser={this.state.currentUser}
              >
              </ExpensesPage>
            }} />

          </Switch>

        </BrowserRouter>
      </React.Fragment>)
  }

}

