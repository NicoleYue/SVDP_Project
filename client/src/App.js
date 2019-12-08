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
  const [isOpen, setIsOpen] = useState(false);
  function logout(e){
    fakeAuth.signout();
    setIsOpen(!isOpen);
  }
  function close(e){
    console.log(isOpen)
    setIsOpen(!isOpen);
  }
  function change(e){
    return !isOpen;
  }
  function PrivateRoute({ component: Component, ...rest }) {
    console.log('compare',fakeAuth.isAuthenticated)
    return (
      <Route
        {...rest}
        render={props =>
          fakeAuth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
    return (
      <div className="App">
        <Router >
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
      {/* <hr/>
      <a className="menu-item"  style={{height:30,justifyContent:'center'}}>
      🕵  Manage Roles
      </a>

      <a className="menu-item"  style={{height:30,justifyContent:'center'}}>
      👟  Manage Paths
      </a> */}
      <li><Link className="link" to="/manageReport" onClick={close} style={{height:30,justifyContent:'center', textDecoration: 'none'}}>
        📈  Status Report
      </Link></li>

      <hr/>
      {/* <a className="menu-item" onClick={close}  style={{height:30,justifyContent:'center'}}>
      💌  My Account Info
      </a> */}
      
      <li><Link className="link" to="/login" onClick={logout}  style={{height:30,justifyContent:'center', textDecoration: 'none'}}>
       🔓  Sign Off
      </Link></li>
    </Menu>

      <div id="page-wrap">
        <h2>St. VINCENT de PAUL ⛪ Pathfinder Tracking System</h2>
      </div>
      <div>
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
