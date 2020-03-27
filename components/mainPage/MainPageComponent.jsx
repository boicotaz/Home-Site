import Group from "./GroupComponent.jsx"
import GroupChat from "./GroupChatComponent.jsx"

/**
 * @typedef groupMessages
 * @type {object}
 * @property {number} groupMessages.id 
 * @property {number} groupMessages.groupId - the group that the chat belongs
 * @property {string} groupMessages.messageText 
 * @property {number} groupMessages.userId 
 * @property {date} groupMessages.timeSent
 */

export default class MainPage extends React.Component {
    // state = {}

    constructor(props) {
        super(props);
        this.state = {}
        this.state.usersInGroup = this.props.usersInGroup;
        this.state.groupDetails = this.props.groupDetails;
        this.state.currentUser = this.props.currentUser;
        this.state.groupMessages = this.props.groupMessages;

        // console.log('how many times am i called tho - main page constructor ?');
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);  
      }

    componentDidMount() {
        $("#content-container").fadeIn('slow');
        let groupChatBody = document.getElementById("groupChatBody");
        groupChatBody.scrollTop = groupChatBody.scrollHeight;
    }

    componentWillMount() {
        // console.log("I AM UNMOUNTED!!!!");
        $("#content-container").css("display", "none");
    }
    render() {
        console.log("MAIN PAGE STATE IS________________________-----___##############################", this.state);
        return (<React.Fragment>
            <div className="row mt-5">
                <Group usersInGroup={this.state.usersInGroup} groupDetails={this.state.groupDetails} currentUser={this.state.currentUser} > </Group>
                <GroupChat usersInGroup={this.state.usersInGroup} currentUser={this.state.currentUser} groupMessages={this.state.groupMessages} groupDetails={this.state.groupDetails} ></GroupChat>
            </div>
        </React.Fragment>)
    }

}