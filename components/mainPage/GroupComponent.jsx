import AddUserInGroupModal from "./AddUserInGroupModalCompenent.jsx";
import GroupMember from "./GroupMemberComponent.jsx";

export default class Group extends React.Component {

    constructor(props) {
        super(props);
        console.log("GROUP PROPS IS________________________-----___##############################", this.props);
        this.state = {}
        this.state.usersInGroup = this.props.usersInGroup;
        // {groupName: String, groupId: integer}
        this.state.groupDetails = this.props.groupDetails;
        this.state.currentUser = this.props.currentUser;
        this.state.loggedInMembersId = this.props.loggedInMembersId;

    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {

        let groupComponents = [];
        let usersInGroupDetails = this.state.usersInGroup;

        for (let key of usersInGroupDetails.keys()) {
            groupComponents.push(<GroupMember userDetails={usersInGroupDetails.get(key)} key={key} groupMemberId={key} loggedInMembersId={this.state.loggedInMembersId} />)
        }

        return (

            <div id="group-dashboard" className="jumbotron col-3 ml-5">
                <AddUserInGroupModal usersInGroup={this.state.usersInGroup} groupDetails={this.state.groupDetails} currentUser={this.state.currentUser} > </AddUserInGroupModal>
                <h1 className="display-6"> <i className="fa fa-home"> </i> {this.state.groupDetails.groupName} </h1>
                <hr className="my-4" />
                <p className="lead"> Users in group </p>
                <div id='usersInGroup' className="lead">
                    {groupComponents}
                </div>
                <div className="u-bttn-container">
                <a id='add-user' type="button" data-toggle="modal" data-target="#addUserForm"
                    className="btn btn-warning bttn bttn--pill mt-3">Invite User </a>
                </div>
            </div>)
    }
}

