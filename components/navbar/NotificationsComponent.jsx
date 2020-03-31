// import '../../public/css/NavigationBarComponent.css'
import '../../public/css/NotificationsComponent.css'
export default class Notifications extends React.Component {
    render() {
        let notifications = <React.Fragment>
            <li className="nav-item dropdown" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="fa-container">
                    <i data-toggle="tooltip" title="Notifications" className="fas fa-bell fa-2x"></i>
                    <i className="badge badge-danger" style={{ position: "absolute", left: "60px", top: "6px" }}>12</i>
                </div>
                {/* <i className="badge dadge-danger" style={{ float: "right" }}></i> */}

                <div className="dropdown-menu dropdown-menu-right" style={{ backgroundColor: "#008b8b", width: "400px" }}
                    aria-labelledby="navbarDropdownMenuLink">
                    <div className="dropdown-item pl-0 pr-0 border-top border-dark">
                        <div className="container h-100">
                            {/* <div class="dropdown-divider"> </div> */}

                            <div className="row mt-1 h-100">
                                <div className="col-2 ml-0 pl-0">
                                    <img src="/public/info.png" alt="UserImg" />
                                </div>
                                <div className="col-10">
                                    <p className="text-light rounded" style={{ width: '100%', overflowWrap: "break-word", whiteSpace: "pre-line" }}>Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify</p>
                                </div>
                            </div>
                            {/* , wordBreak:"break-word" overflowWrap: "break-word" */}
                        </div>

                    </div>
                    <div className="dropdown-item pl-0 pr-0 border-top border-dark">
                        <div className="container h-100">
                            {/* <div class="dropdown-divider"> </div> */}

                            <div className="row mt-1 h-100">
                                <div className="col-2 ml-0 pl-0">
                                    <img src="/public/_MG_2496.jpg" alt="UserImg" className="rounded" style={{ height: "50%", width: "50%" }} />
                                </div>
                                <div className="col-10">
                                    <p className="text-light rounded" style={{ width: '100%', overflowWrap: "break-word", whiteSpace: "pre-line" }}>Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify Notify</p>
                                </div>
                            </div>
                            {/* , wordBreak:"break-word" overflowWrap: "break-word" */}
                        </div>

                    </div>
                </div>
                {/* </NavLink> */}

            </li>
        </React.Fragment >

        return notifications;
    }
}

