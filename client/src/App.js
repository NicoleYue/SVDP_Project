import React,{useState} from 'react';
import './App.css';
import Home from './components/home';
import Login from './components/login'
import AddMember from './components/addMember'
import EditMember from './components/editMember'
import manageReport from './components/manageReport'
import {BrowserRouter as Router,Switch,Route,Link,Redirect } from "react-router-dom";
import { fakeAuth } from "./context/auth";
import { slide as Menu } from "react-burger-menu";
import MemberReport from './components/memberReport';
import Notification from './components/notification';
import CommunicationReport from './components/CommunicationReport';
import Sacrament from './components/sacrament';
function App(props) {
  //useState is to enable developers to use state without writing a class
  const [isOpen, setIsOpen] = useState(false); 
  //The function to logout the user account
  function logout(e){
    fakeAuth.signout();
    setIsOpen(!isOpen);
  }
  //close the menu after user click on an item in the menu
  function close(e){
    console.log(isOpen)
    setIsOpen(!isOpen);
  }
  //PrivateRoute is to make the web page unavliable for user who did not login
  function PrivateRoute({ component: Component, ...rest }) {
    console.log('compare',fakeAuth.isAuthenticated)
    return (
      <Route
        {...rest}
        render={props =>
          fakeAuth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            //Redirect to login page if user does not login
            <Redirect to="/login" />
          )
        }
      />
    );
  }
    return (
      <div className="App">
        <Router >
        {/* The menu that can be triggered on the top left cornor button*/}
        <Menu {...props} isOpen={isOpen} >
        <li><Link className="link" to="/" onClick={close} style={{height:30,justifyContent:'center', textDecoration: 'none'}}>
          👨‍👩‍👧 Member table
        </Link></li>

        <li><Link className="link" to="/addMember" onClick={close} style={{height:30,justifyContent:'center', textDecoration: 'none'}}>
        👏🏻Add Member
        </Link></li>

        <li><Link className="link" to="/notification" onClick={close} style={{height:30,justifyContent:'center', textDecoration: 'none'}}>
      🔔  My Reminders
      </Link></li>
      {/* Below are what might be add to the menu in the future */}
      {/* <hr/>
      <a className="menu-item"  style={{height:30,justifyContent:'center'}}>
      🕵  Manage Roles
      </a>

      <a className="menu-item"  style={{height:30,justifyContent:'center'}}>
      👟  Manage Paths
      </a> 
      <a className="menu-item" onClick={close}  style={{height:30,justifyContent:'center'}}>
      💌  My Account Info
      </a> */}
      <li><Link className="link" to="/manageReport" onClick={close} style={{height:30,justifyContent:'center', textDecoration: 'none'}}>
        📈  Status Report
      </Link></li>

      <hr/>
      
      <li><Link className="link" to="/login" onClick={logout}  style={{height:30,justifyContent:'center', textDecoration: 'none'}}>
       🔓  Sign Off
      </Link></li>
    </Menu>
      {/* Here is the title add the top of every page */}
      <div id="page-wrap">
        <h2>St. VINCENT de PAUL ⛪ Pathfinder Tracking System</h2>
      </div>
      <div>
        {/* Below linked the address of each page with each components, to tell the web what information to show up in each page */}
      <Switch>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/" exact component={Home}/>
        <PrivateRoute path="/notification" exact component={Notification}/>
        <PrivateRoute path="/manageReport" exact component={manageReport}/>
        <PrivateRoute path="/editMember/:id/sacrament" component={Sacrament}/>
        <PrivateRoute path="/addMember" exact component={AddMember}/>
        <PrivateRoute path="/editMember/:id" component={EditMember}/>
        <PrivateRoute path="/memberReport/:id" component={MemberReport}/>
        <PrivateRoute path="/communicationReport/:id" component={CommunicationReport}/>
      </Switch>
    </div>
    </Router>
      </div>
    );
  }
export default App;
