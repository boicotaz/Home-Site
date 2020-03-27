export default class GroupMember extends React.Component {
    render() {
        // let [userFirstName, userLastName, userId] = this.props.user;

        let loggedInStatus;
        if (this.props.loggedInMembersId === undefined) {
            loggedInStatus = "btn-danger";
        }
        else {
            if (this.props.loggedInMembersId.includes(this.props.groupMemberId)) {
                loggedInStatus = "btn-success";
            }
            else {
                loggedInStatus = "btn-danger";
            }
        }
        // btn-danger
        return (<a className={"btn btn-lg mr-1 mb-2 " + loggedInStatus} href="#" role="button">{this.props.userDetails.firstName}</a>);
    }
}