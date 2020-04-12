export default class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.notifications = {};
        this.state.currentUser = this.props.currentUser;
        this.state.notifications.dataArray = this.props.notifications.filter(notification => {
            if (this.state.currentUser.id != notification.userId)
                return notification;
        })
        this.state.notifications.newNotificationsSum = this.state.notifications.dataArray.length;

        this.state.notifications.notificationAdded = false;

        this.state.usersInGroup = this.props.usersInGroup;

        console.log('Notifications in contructor__________________________', this.props.notifications);
        console.log("NOTIFICATIONS CALLED________________________-----___##############################", this.state);
    }

    componentWillReceiveProps(nextProps) {
        console.log('Notifications in will receive props__________________________', nextProps);
        // if (nextProps.notifications[nextProps.notifications.length - 1].userId == this.state.currentUser.id) return;
        let updatedNotifications = {};
        updatedNotifications.dataArray = nextProps.notifications.filter(notification => {
            if (this.state.currentUser.id != notification.userId)
                return notification;
        })

        updatedNotifications.newNotificationsSum = updatedNotifications.dataArray.length;
        if (updatedNotifications.newNotificationsSum > this.state.notifications.newNotificationsSum) {
            updatedNotifications.notificationAdded = true;
        }
        else {
            updatedNotifications.notificationAdded = false;
        }

        this.setState({ notifications: updatedNotifications, usersInGroup: nextProps.usersInGroup });

    }

    componentDidUpdate() {

        if (this.state.notifications.notificationAdded) {
            $('#bell').addClass("fa-bell--animation");
            document.getElementById("newNotificationSound").play();
            setTimeout(function () {
                $('#bell').removeClass("fa-bell--animation");
            }, 1400);

        }

    }

    constructProperties(notification) {
        if (notification.userId == this.state.currentUser.id)
            return null;

        let notificationProperties = {};
        let notificationCreator = this.state.usersInGroup.get(notification.userId);

        notificationProperties.FirstName = notificationCreator.firstName;
        notificationProperties.type = notification.type;

        if (notificationCreator.profImgExists) {
            notificationProperties.imgPath = "public/uploads/profImg_user" + notificationCreator.userId + "_.png";
        }
        else {
            notificationProperties.imgPath = "public/icons8-edit-64.png";
        }

        if (notificationProperties.type == "expense") {
            notificationProperties.badge = "fa-wallet";
        }
        else if (notificationProperties.type == "group member") {
            notificationProperties.badge = "fa-home";
        }

        if (notificationProperties.details != null) {
            notificationProperties.action = notificationProperties.details;
        }
        else {
            notificationProperties.action = "added";
        }

        notificationProperties.createdAt = formatDate(new Date(notification.createdAt));
        // notificationProperties.createdAt = date.toLocaleString().replace(",", "").replace(/:.. /, " ");
        // notificationProperties.text = ;

        return notificationProperties;
    }

    render() {
        console.log("NOTIFICATIONS STATE IS________________________-----___##############################", this.state);
        let newNotificationsStyle = { position: "absolute", left: "55%", top: "8%" };

        if (this.state.notifications.newNotificationsSum == 0) {
            newNotificationsStyle.display = "none";
        }

        let notificationsItems = this.state.notifications.dataArray.map(notification => {
            let notificationProperties = this.constructProperties(notification);
            if (notificationProperties == null) return null;

            return (<React.Fragment>
                <div className="dropdown-item p-0 pt-3 pb-3 h-100 dropdown-item--custom-width dropdown-item--shadow">
                    <div className="row m-1 p-0 ml-3 align-content-center" style={{ maxHeight: '8rem', overflowY: 'auto', height: "8rem" }}>
                        <div className="col-2 ml-0 pl-0 pr-0">
                            <img src={notificationProperties.imgPath} className="img-thumbnail rounded-circle img-pos" alt="UserImg" />
                            <i className={"fas " + notificationProperties.badge + " fa-custom"}></i>
                        </div>
                        <div className="col-10 p-0">
                            <p className="text-light rounded m-0" style={{ width: '100%', overflowWrap: "break-word", whiteSpace: "pre-line", fontSize: "1.4rem" }}> <b> {notificationProperties.FirstName} </b>  {" " + notificationProperties.action + " a new "}  <b> {notificationProperties.type} </b></p>
                            <p className="text-light rounded m-0 notification-text" >{notificationProperties.createdAt}</p>
                        </div>
                    </div>
                    {/* , wordBreak:"break-word" overflowWrap: "break-word" */}
                </div>
            </React.Fragment>)

        }).filter(notificationItem => {
            if (notificationItem) return notificationItem;
        });

        let notifications = <React.Fragment>
            <li className="nav-item dropdown" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="fa-container">
                    <i id="bell" data-toggle="tooltip" title="Notifications" className="fas fa-bell fa-2x "></i>
                    <i className="badge badge-pill badge-danger badge--font" style={newNotificationsStyle}>{this.state.notifications.newNotificationsSum}</i>
                </div>
                <div className="dropdown-menu dropdown-menu-right p-0 dropdown-menu--rounded dropdown-menu--custom bg-dark"
                    aria-labelledby="navbarDropdownMenuLink">
                    <span className="dropdown-header dropdown-header--font dropdown-header--grey ">Notifications</span>
                    {notificationsItems}
                </div>
                {/* </NavLink> */}

            </li>
        </React.Fragment >

        return notifications;
    }
}

/**
 * 
 * @param {Date} date 
 * @return {string} - the formatted date E.g. "6 March 2020"
 */
function formatDate(date) {

    let month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    let customDate = date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();

    return customDate

}