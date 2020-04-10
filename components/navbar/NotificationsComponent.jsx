export default class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.notifications = this.props.notifications;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    componentDidUpdate() {

        if (this.state.notifications.notificationAdded) {
            $('#bell').addClass("fa-bell--animation");

            setTimeout(function () {
                $('#bell').removeClass("fa-bell--animation");
            }, 1400);

        }

    }

    render() {
        let newNotificationsStyle = { position: "absolute", left: "55%", top: "8%" };

        if (this.state.notifications.newNotificationsSum == 0) {
            newNotificationsStyle.display = "none";
        }

        let notifications = <React.Fragment>
            <li className="nav-item dropdown" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="fa-container">
                    <i id="bell" data-toggle="tooltip" title="Notifications" className="fas fa-bell fa-2x "></i>
                    <i className="badge badge-pill badge-danger badge--font" style={newNotificationsStyle}>{this.state.notifications.newNotificationsSum}</i>
                </div>
                <div className="dropdown-menu dropdown-menu-right p-0 dropdown-menu--rounded dropdown-menu--custom bg-dark"
                    aria-labelledby="navbarDropdownMenuLink">
                    <span className="dropdown-header dropdown-header--font dropdown-header--grey ">Notifications</span>

                    <div className="dropdown-item p-0 pt-3 pb-3 h-100 dropdown-item--custom-width dropdown-item--shadow">
                        <div className="row m-1 p-0 ml-3 align-content-center" style={{ maxHeight: '8rem', overflowY: 'auto', height: "8rem" }}>
                            <div className="col-2 ml-0 pl-0 pr-0">
                                <img src="/public/myimg.jpg" className="img-thumbnail rounded-circle img-pos" alt="UserImg" />
                                <i className="fas fa-wallet fa-custom"></i>
                            </div>
                            <div className="col-10 p-0">
                                <p className="text-light rounded m-0" style={{ width: '100%', overflowWrap: "break-word", whiteSpace: "pre-line", fontSize: "1.4rem" }}>Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify</p>
                            </div>
                        </div>
                        {/* , wordBreak:"break-word" overflowWrap: "break-word" */}
                    </div>


                    <div className="dropdown-item p-0 pt-3 pb-3 h-100 dropdown-item--custom-width dropdown-item--shadow">
                        <div className="row m-1 p-0 ml-3 align-content-center" style={{ maxHeight: '10rem', overflowY: 'auto', height: '8rem' }}>
                            <div className="col-2 ml-0 pl-0 pr-0">
                                <img src="/public/38k17x.png" className="img-thumbnail rounded-circle img-pos" alt="UserImg" />
                                <i className="far fa-calendar-alt fa-custom"></i>
                            </div>
                            <div className="col-10 p-0">
                                <p className="text-light rounded m-0" style={{ width: '100%', overflowWrap: "break-word", whiteSpace: "pre-line", fontSize: "1.4rem" }}>Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify</p>
                            </div>
                        </div>
                        {/* , wordBreak:"break-word" overflowWrap: "break-word" */}
                    </div>
                </div>
                {/* </NavLink> */}

            </li>
        </React.Fragment >

        return notifications;
    }
}

