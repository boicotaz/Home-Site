import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          {/* Brand */}
          <img
            src={"../../public/room8s_logo.png"}
            alt="logo"
            style={{ width: "60px" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
            <a className="nav-link">
              <Link style={{color:'white'}} to="/home"><i className="fa fa-home fa-2x"></i></Link>
              {/* 
                <span className="sr-only">(current)</span>
              */}</a> 
            </li>
            <li className="nav-item">
            <a className="nav-link" href="/expenses">
              <Link style={{color:'white'}} to="/expenses"><i className="fa fa-usd fa-2x" aria-hidden="true"></i></Link>
                  {/* <span className="badge badge-danger"></span> */}
              </a> 
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                <Link style={{color:'white'}} to ="/expenses"><i className="fa fa-sticky-note-o fa-2x" aria-hidden="true">
                  {/* <span className="badge badge-warning"></span> */}
                </i> </Link>
                {/* Notes */}
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i style={{color:'white'}} className="fa fa-bell fa-2x" aria-hidden="true">
                  {/* <span className="badge badge-primary"></span> */}
                </i>
                {/* Notifications */}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/">
                  Action
            </a>
                <a className="dropdown-item" href="/">
                  Another action
            </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/">
                  Something else here
            </a>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="fa fa-user-circle-o">
                  <span className="badge badge-info"></span>
                </i>
                {/* Profile */}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="fa fa-sign-out">
                  <span className="badge badge-success"></span>
                </i>
                {/* Logout */}
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
        </button>
          </form>
        </div>
      </nav>
    </React.Fragment>

  );
}

export default NavigationBar;