import { Link,NavLink } from "react-router-dom";
import React from 'react';
import "./nav.css"

// <Link to="/">
//</Link>
 



class NavigationBar extends React.Component{

  render(){
    return( 
<React.Fragment>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  
  <a className="navbar-brand" href="#"><img
        src={"../../public/room8s_logo.png"}
        width="40"  
        height="40"
        className="d-inline-block align-top"
        alt="room8s logo"
      />
      
  </a>
<button 
  className="navbar-toggler" 
  type="button" 
  data-toggle="collapse" 
  data-target="#navbarToggler" 
  aria-controls="navbarToggler" 
  aria-expanded="false" 
  aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>



<div className="collapse navbar-collapse" id="navbarToggler">
  <ul className="nav nav-tabs mx-auto mt-2 mt-lg-0" id="myTabJust" role="tablist">

    <li className="nav-item">
      <NavLink exact activeClassName="selected" to="/home">
        <a className="nav-link"> 
          <i className="fas fa-home">
          </i>
        </a>
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink exact activeClassName="selected" to="/expenses">
        <a className="nav-link">
          <i className="fas fa-wallet">
          </i>
        </a>
      </NavLink>
    </li>


    <li className="nav-item">
      <NavLink exact activeClassName="selected" to="/home">
        <a className="nav-link">
          <i className="far fa-calendar-alt">
          </i>
        </a>
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink exact activeClassName="selected" to="/expenses">
        <a className="nav-link">
          <i className="fas fa-bell">
          </i>
        </a>
      </NavLink>
    </li>



  <li className="nav-item">
    <NavLink exact activeClassName="selected" to="/home">
      <a className="nav-link" >
        <i className="fas fa-tasks">
        </i>
      </a>
    </NavLink>
  </li> 
</ul>



    <form class="form-inline my-2 my-lg-0">
    <div className="dropdown my-2 my-sm-0">
    <a className="btn btn-default dropdown-toggle" href="#" role="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Settings">
      <i className="fas fa-users-cog"></i>
    </a>

  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">Profile</a>
    <a className="dropdown-item" href="#">Settings</a>
    <a className="dropdown-item" href="#">Logout</a>
  </div>  
  </div>

      <input className="form-control mr-sm-2" type="search" placeholder="Search Users" aria-label="Search"/>
   
    </form>
  </div>
</nav>


</React.Fragment> )
}}


 

export default NavigationBar;