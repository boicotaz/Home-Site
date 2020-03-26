import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { grouDetailsAjax } from "../ajax/groupDetailsAjax";
import { groupMessagesAjax } from "../ajax/groupMessagesAjax";
import MainPage from "./mainPage/MainPageComponent.jsx";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log("ROUTER CONTRUCTOR  WAS CALLED________________________-----___##############################");

        Promise.all([grouDetailsAjax.getUsersInGroupDetails(), grouDetailsAjax.getGroupDetails(), groupMessagesAjax.getGroupMessages()]).then((res) => {
            console.log('Results are from Promise.all: ', res);
            let [usersInGroup, groupDetails, groupMessages] = res;

            this.state.groupDetails = groupDetails;
            this.state.usersInGroup = usersInGroup;
            this.state.groupMessages = groupMessages;

            // ReactDOM.render(
            //     <MainPage usersInGroup={usersInGroup} groupDetails={groupDetails} currentUser={user} groupMessages={groupMessages} > </MainPage>, document.getElementById('content')
            // );
        }).catch((error) => console.log(error));
    }
    render() {
        // console.log("ROUTER RENDER WAS CALLED________________________-----___##############################");
        console.log("ROUTER STATE IS________________________-----___##############################", this.state, loggedInUser);
        // let MainPageComponent = <MainPage usersInGroup={this.state.usersInGroup} groupDetails={this.state.groupDetails} currentUser={loggedInUser} groupMessages={this.state.groupMessages} ></MainPage>
        let groupDetails = this.state.groupDetails;
        return (
            <React.Fragment>
                <BrowserRouter>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/home">Home</Link>
                                </li>
                                <li>
                                    <Link to="/expenses">Expenses</Link>
                                </li>
                                <li>
                                    <Link to="/users">Users</Link>
                                </li>
                            </ul>
                        </nav>

                        <Switch>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/expenses">
                                <Users />
                            </Route>

                            <Route exact groupDetails={groupDetails} path="/home" render={(props) => {
                                return <MainPage test="hi"  {...props} > </MainPage>
                            }} />
                            <Route exact path='/FileUpload' render={
                                (props) => <FileUpload {...props} acc={this.state.account} ethAdd={this.state.ethAddress} />
                            } />
                        </Switch>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }

    // renderRoute = ()
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}
