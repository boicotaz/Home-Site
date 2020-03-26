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
        console.log("I AM IN MAIN PAGE COMPONENT LETS SEE THE PROPS", this.props);
    }

    componentDidMount() {
        $("#content-container").fadeIn('slow');
        let groupChatBody = document.getElementById("groupChatBody");
        groupChatBody.scrollTop = groupChatBody.scrollHeight;
    }

    componentWillMount() {
        $("#content-container").css("display", "none");
    }
    render() {

        return (<React.Fragment>
            <div className="row mt-5">
                <Group usersInGroup={this.state.usersInGroup} groupDetails={this.state.groupDetails} currentUser={this.state.currentUser} > </Group>
                <GroupChat usersInGroup={this.state.usersInGroup} currentUser={this.state.currentUser} groupMessages={this.state.groupMessages} groupDetails={this.state.groupDetails} ></GroupChat>
            </div>
        </React.Fragment>)
    }

}