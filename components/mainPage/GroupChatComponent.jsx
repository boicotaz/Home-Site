import { v4 as uuidv4 } from "uuid";
// import regeneratorRuntime from "regenerator-runtime";
import { groupMessagesAjax } from "../../ajax/groupMessagesAjax";
import Message from "./MessageComponent.jsx";

export default class GroupChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.usersInGroup = this.props.usersInGroup;
    this.state.currentUser = this.props.currentUser;
    this.state.groupMessages = this.props.groupMessages;
    this.state.groupDetails = this.props.groupDetails;

    document.addEventListener(
      "newGroupMessageCreated",
      this.newGroupMessageCreatedEventHandler
    );

    document.addEventListener("userChangedPhoto", e => {
      let userDetail = this.state.usersInGroup.get(e.detail.userId);
      if (userDetail != undefined) {
        this.state.userImageChanged = e.detail.userId;
        this.forceUpdate();
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  newGroupMessageCreatedEventHandler = e => {
    socket.emit("broadcastNewGroupMessage", e.detail);
    console.log("####_____lets emit the broadcast event______####");
  };

  submitMessageEnterKey = e => {
    if (e.keyCode === 13) {
      if ($("#searchText").val() != "") {
        let messageText = $("#searchText").val();
        $("#searchText").val("");
        this.renderNewMessage(messageText);
      }
    }
  };

  submitMessageClickKey = e => {
    if ($("#searchText").val() != "") {
      let messageText = $("#searchText").val();
      $("#searchText").val("");
      this.renderNewMessage(messageText);
    }
  };

  storeNewMessage = newMsg => {
    newMsg.groupId = this.state.groupDetails.groupId;
    groupMessagesAjax.storeNewMessage(newMsg);
  };

  renderNewMessage = msgText => {
    let date = new Date();
    let newMsgDetails = {};
    newMsgDetails.userId = this.state.currentUser.id;
    newMsgDetails.messageText = msgText;
    newMsgDetails.timeSent = date
      .toLocaleString()
      .replace(",", "")
      .replace(/:.. /, " ");

    let msgProperties = ["userId", "messageText", "timeSent"];
    let msg = {};
    for (let key of Object.keys(newMsgDetails)) {
      if (msgProperties.includes(key)) {
        msg[key] = newMsgDetails[key];
      }
    }
    this.setState({ groupMessages: [...this.state.groupMessages, msg] });
    console.log("____________in render message_______", msg);

    this.broadcastMessage(newMsgDetails);

    let updateRouterEvent = new CustomEvent("updateMyNewMessage", {
      detail: msg
    });
    document.dispatchEvent(updateRouterEvent);

    newMsgDetails.timeSent = date.toMysqlFormat();
    this.storeNewMessage(newMsgDetails);
  };

  broadcastMessage = newMsg => {
    let newMsgDetails = {};
    newMsgDetails.message = newMsg;

    let groupUsers = this.state.usersInGroup;

    let groupUsersIds = [];

    for (let key of groupUsers.keys()) {
      if (key != this.state.currentUser.id) groupUsersIds.push(key);
    }
    newMsgDetails.groupUsersIds = groupUsersIds;
    newMsgDetails.currentUserId = this.state.currentUser.id;

    let broadcastMessageEvent = new CustomEvent("newGroupMessageCreated", {
      detail: newMsgDetails
    });
    document.dispatchEvent(broadcastMessageEvent);
  };

  componentDidMount() {
    document
      .getElementById("searchText")
      .addEventListener("keydown", this.submitMessageEnterKey, false);
  }

  componentDidUpdate() {
    let groupChatBody = document.getElementById("groupChatBody");
    groupChatBody.scrollTop = groupChatBody.scrollHeight;
  }

  componentWillUnmount() {
    document
      .getElementById("searchText")
      .removeEventListener("keydown", this.submitMessageEnterKey, false);
    document.removeEventListener(
      "newGroupMessageCreated",
      this.newGroupMessageCreatedEventHandler
    );
    // document.removeEventListener('newGroupMessageReceived');
    this.state.userImageChanged = undefined;
  }

  render() {
    console.log(
      "GROUP CHAT COMPONENT STATE IS________________________-----___##############################",
      this.state
    );
    let groupChat = (
      <React.Fragment>
        <div
          className="container col-3"
          id="groupChat"
          style={{ height: "51rem" }}
        >
          <div
            className="row bg-dark "
            style={{
              borderRadius: "100rem 100rem 0px 0px",
              height: "10%",
              maxHeight: "12%",
              width: "auto",
              borderBottom: "0.1rem solid #757575"
            }}
          >
            {/* <div className="col-12 bg-dark rounded-top rounded-right rounded-left border-bottom"  >
                        <div className="row justify-content-start">
                            <img src="/public/room8s_logo.png" className="col-2" />
                            <span className="text-warning mb-0" style={{ fontSize: "20px" }}> {this.state.groupDetails.groupName + " Chat"} </span>
                        </div>
                    </div> */}
          </div>

          <div
            className="row scrollbar scrollbar-primary"
            id="groupChatBody"
            style={{ maxHeight: "50rem", overflowY: "auto", height: "60rem" }}
          >
            <div className="col-12 bg-dark">
              {this.state.groupMessages.map(message => {
                return (
                  <Message
                    key={uuidv4()}
                    userImageChanged={this.state.userImageChanged}
                    message={message}
                    currentUser={this.state.currentUser}
                    groupDetails={this.state.groupDetails}
                    usersInGroup={this.state.usersInGroup}
                  />
                );
              })}
            </div>
          </div>

          <div
            className="row bg-dark align-items-center"
            style={{
              height: "10%",
              width: "auto",
              borderTop: ".1rem solid #757575",
              borderRadius: "0rem 0rem 1rem 1rem"
            }}
          >
            {/* <div className="input-group offset-2"> */}
            <div className="u-input-container ml-4">
              <input
                autoComplete="off"
                id="searchText"
                placeholder="Type le Message..."
                type="text"
                className="form-control input input--pill input--dark"
                style={{ width: "auto" }}
              />
            </div>

            {/* <div className="input-group-append">
                                <button onClick={this.submitMessageClickKey} className="btn btn-success" type="button">Send</button>
                            </div> */}
            {/* </div> */}
          </div>
        </div>
      </React.Fragment>
    );
    return groupChat;
  }
}
