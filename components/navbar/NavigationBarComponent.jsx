import {NavLink } from "react-router-dom";
import React from 'react';
import '../../public/css/NavigationBarComponent.css'
import Notifications from "./NotificationsComponent.jsx"
import {substringMatcher,userAutocomplete} from "../../js/autocomplete"
import {userAjax} from "../../ajax/userAjax"
import '../../public/css/autocomplete.css' // this css is enabled even though we dont import it. i import it only for clarification. We need to find a method to make imported css available only to the file that imported it. 

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
          width="40"  
          height="40"
          className="d-inline-block align-top"
          alt="room8s logo"
        /></a>
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
      <ul className="nav navbar-nav flex-row">
      
          <li className="nav-item">
          <NavLink to="/profile" activeClassName="selected">
          <i data-toggle="tooltip" title="Profile" className="fas fa-user fa-lg"></i>
          </NavLink></li>
  
          <li className="nav-item">
          <NavLink to="/sign-out" activeClassName="selected">
          <i data-toggle="tooltip" title="Sign out" href="/sign-out" className="fas fa-sign-out-alt fa-lg"></i>
          </NavLink></li> 
      </ul>
  
  
      <form id='search-form' className="form-inline">
      
        <input 
        id='search-bar'
        className="form-control mr-sm-2" 
        type="search" 
        placeholder="Search Users"
        aria-label="Search"
        />
      </form>
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
