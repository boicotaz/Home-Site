//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// edo mporei na mpei to routing
//Components
import NavigationBar from "./navbar/NavigationBarComponent.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./mainPage/MainPageComponent.jsx";
import ExpensesPage from "./expensesPage/ExpensesPageComponent.jsx"

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.groupDetails = this.props.groupDetails;
    this.state.groupMessages = this.props.groupMessages;
    this.state.currentUser = this.props.currentUser;

    this.state.usersInGroup = this.props.usersInGroup;

    this.state.view = this.props.view;
    this.state.expenses = this.props.expenses;
    this.state.totals = this.props.totals;

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
      let usersInGroupArray = e.detail;
      let usersInGroupMap = new Map();
      for (let userInGroup of usersInGroupArray) {
          usersInGroupMap.set(userInGroup[0],userInGroup[1]);
      }
      this.setState({usersInGroup: usersInGroupMap});
  });

  }
  


  render() {
    console.log("APP STATE IS________________________-----___##############################", this.state);
    return (
      <React.Fragment>
        <BrowserRouter>

          <NavigationBar> </NavigationBar>

          <Switch>

            <Route exact path="/home" render={(props) => {
              return <MainPage  {...props} groupDetails={this.state.groupDetails} groupMessages={this.state.groupMessages} usersInGroup={this.state.usersInGroup} currentUser={this.state.currentUser}  > </MainPage>
            }} />

            <Route exact path="/expenses" render={(props) => {
              return <ExpensesPage  {...props} view={this.state.view} expenses={this.state.expenses} totals={this.state.totals} usersInGroupDetails={this.state.usersInGroup}  > </ExpensesPage>
            }} />

          </Switch>

        </BrowserRouter>
      </React.Fragment>)
  }

}

