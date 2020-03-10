class Group extends React.Component {
    state = {}

    constructor(props) {
        super(props);
        this.state.usersInGroup = props.usersInGroup;
        this.state.groupDetails = props.groupDetails;
        let usersInGroupId = props.usersInGroup.map(elem => elem[1]);
        var getUserLoggedStatusEvent = new CustomEvent('LoggedInStatus', {detail: { currentUserId: props.currentUser.id , usersInGroupId: usersInGroupId}} );
        document.dispatchEvent(getUserLoggedStatusEvent);

        document.addEventListener('LoggedInStatusReply', e => {
            this.setState({loggedInMembersId: e.detail})           
        });

    }

    render() {
        return (        
            <div id="group-dashboard" className="jumbotron col-3 ml-5 mt-3">
                <h1 className="display-6"> <i className="fa fa-home"> </i> {this.state.groupDetails.groupName} </h1>
                <hr className="my-4"/>
                <p className="lead"> Users in group </p>
                <div id='usersInGroup' className="lead">
                {this.state.usersInGroup.map(user => {
                    return <GroupMember user= {user} key={user[1]} groupMemberId = {user[1]} loggedInMembersId = {this.state.loggedInMembersId} />
                })}
                </div>
                <button id='add-user' type="button" data-toggle="modal" data-target="#addUserForm"
                    className="btn btn-secondary mt-5"> Add users in
                    group </button>
            </div>)
    
    }
}

class GroupMember extends React.Component {
    render() {
        let loggedInStatus;
        if (this.props.loggedInMembersId === undefined ){
            loggedInStatus = "btn-danger";
        }
        else {
            if (this.props.loggedInMembersId.includes(this.props.user[1])) {
                loggedInStatus = "btn-success";
            }
            else{
                loggedInStatus = "btn-danger";
            }
        }
        // btn-danger
        return (<a className={"btn btn-lg mr-1 mb-2 " + loggedInStatus}  href="#" role="button">{this.props.user[0]}</a>);
    }
}