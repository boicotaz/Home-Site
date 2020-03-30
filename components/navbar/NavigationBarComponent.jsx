import {NavLink } from "react-router-dom";
import React from 'react';
import '../../public/css/NavigationBarComponent.css'
import Notifications from "./NotificationsComponent.jsx"

class NavigationBar extends React.Component{

    render(){
      return( 
  <React.Fragment>
  
  <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark justify-content-between">
      
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
                  <i data-toggle="tooltip" title="Home" className="fas fa-home fa-2x"></i> 
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
              <Notifications></Notifications>
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
  
  
      <form className="form-inline">
      
        <input 
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
