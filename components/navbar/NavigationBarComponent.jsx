import {NavLink } from "react-router-dom";
import React from 'react';
import Notifications from "./NotificationsComponent.jsx"
import {substringMatcher,userAutocomplete} from "../../js/autocomplete"
import {userAjax} from "../../ajax/userAjax"

class NavigationBar extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
        this.state.notifications = this.props.notifications;
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps);
    }

    componentDidMount() {
        userAutocomplete(userAjax,substringMatcher);
        $('[data-toggle="tooltip"]').tooltip();
    }
    componentDidUpdate() {
        $('[data-toggle="tooltip"]').tooltip();
    }
    render(){
      return( 
  <React.Fragment>

  <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark justify-content-between navbar-animation">
      

        <a href="/" className="navbar-brand"><img
            src={"../../public/room8s_logo.png"}
            className="navbar-brand --image"
            alt="room8s logo"
            /></a>
            <div className="nav-item ml-4" style={{position:"relative"}}>
                <i className="fas fa-search pr-3" aria-hidden="true"></i>
            </div>

            <div className="nav-item" style={{width: "20rem"}}>
               
                <form id='search-form'>
                <div className="u-input-container">
                    <input 
                    id='search-bar'
                    className="form-control input input--pill input--dark" 
                    type="search" 
                    placeholder="Search Users..."
                    aria-label="Search"
                    />
                </div>
                </form>
            </div>


        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse justify-content-center" id="collapsingNavbar">
          <ul className="navbar-nav">
              <li className="nav-item">
              <NavLink to="/home" activeClassName="selected" >
                  <i data-toggle="tooltip" title="Home"  className="fas fa-home fa-2x"></i> 
              </NavLink>
              </li>
              <li className="nav-item">
              <NavLink  to="/expenses" activeClassName="selected">
                  <i data-toggle="tooltip" title="Expenses" className="fas fa-wallet fa-2x"></i>
                  </NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/calendar" activeClassName="selected" >
                  <i data-toggle="tooltip" title="Calendar" className="far fa-calendar-alt fa-2x"></i>
                  </NavLink>
              </li>
              <li className="nav-item ">
              <NavLink to="/tasks" activeClassName="selected">
              <i data-toggle="tooltip" title="tasks" className="fas fa-tasks fa-2x"></i>
                  </NavLink>
              </li>
              <Notifications notifications={this.state.notifications}></Notifications>

          </ul>
      </div>
      <ul className="nav navbar-nav flex-row" style={{width:"20%"}}>
            <li className="nav-item">
                <NavLink to="/profile" activeClassName="selected">
                <i data-toggle="tooltip" title="Profile" className="fas fa-user fa-2x"></i>
            </NavLink></li>
            <li className="nav-item">
                {/* <NavLink to="/sign-out" activeClassName="selected"> */}
                <a href="/sign-out"> <i data-toggle="tooltip" title="Sign out"  className="fas fa-sign-out-alt fa-2x "></i></a>
                
            </li> 

      </ul>
  
  

  </nav>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  
  </React.Fragment> )
  }}
  
  export default NavigationBar;
