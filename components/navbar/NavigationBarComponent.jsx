import { Link } from "react-router-dom";
import React from 'react';


class NavigationBar extends React.Component{

  render(){
    return( 

<React.Fragment>
  <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">

  {/* Nav Brand */}
    <a className="navbar-brand" href="#">
      <img
        src={"../../public/room8s_logo.png"}
        width="40"  
        height="40"
        className="d-inline-block align-top"
        alt="room8s logo"
      />
    </a>
{/* Burger Button */}
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">

    
  {/* Side Menu and Search Bar */}

<div className="navbar-nav nav-tabs nav-justified" ></div>
  <div className="dropdown">
    <a className="btn btn-default dropdown-toggle" href="#" role="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Settings">
      <i className="fas fa-users-cog"></i>
    </a>

  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">Profile</a>
    <a className="dropdown-item" href="#">Settings</a>
    <a className="dropdown-item" href="#">Logout</a>
  </div>  
  </div>

        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search Users" aria-label="Search"/>
        </form>
      {/* </Nav> */}  
    </div>
  </nav>



{/* Main Menu in the center of the page */}
<div className="container">
<div className="collapse navbar-collapse" id="navbarSupportedContent">
<ul className="nav nav-tabs nav-justified" >
  <li className="nav-item ative">
  <Link style={{color:"#003300"}} to="/home"><a data-toggle="tab" className="nav-link " >Home</a></Link>
  </li>
  <li className="nav-item">
  <Link style={{color:"#990000"}} to="/expenses"><a data-toggle="tab"  className="nav-link" > Expenses</a></Link>
  </li>
  <li className="nav-item">
  <Link style={{color:"#e6ac00"}} to="/calendar"> <a  data-toggle="tab" className="nav-link" > Calendar</a></Link>
  </li>
  <li className="nav-item">
  <Link style={{color:"black"}} to="/notifications"><a data-toggle="tab" className="nav-link" > Notifications</a></Link>
  </li>
</ul>

<div className="tab-content ">
			  <div className="tab-pane active" id="1">
          <h3>Standard tab panel created on bootstrap using nav-tabs</h3>
				</div>
				<div className="tab-pane" id="2">
          <h3>Notice the gap between the content and tab after applying a background color</h3>
				</div>
        <div className="tab-pane" id="3">
          <h3>add clearfix to tab-content (see the css)</h3>
				</div>
			</div>
  

<hr></hr>

  
</div>
</div>
  <br>
</br>


</React.Fragment> )

}}


 

export default NavigationBar;