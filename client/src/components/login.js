import React, { useState } from 'react';
import { fakeAuth } from "../context/auth";
import {Redirect} from "react-router-dom";

export default function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userid, setId] = useState('');

  function onSubmit(event){
    event.preventDefault();
    //console.log("Entered email & password:" + JSON.stringify(this.state));
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:userName,password:password})
    })
    .then(res =>  {
      //console.log("res",res)
      if (res.status === 200) {
        return res.json()
      } else if(res.status === 204){
        setMessage("📧 Email does not exist");
        return <Redirect to="/login" />;
      } else if(res.status === 205){
        setMessage("Email and password do not match");
        return <Redirect to="/login" />;
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .then((id) => {
      console.log("fetch set id",id)
      setId(id);
      setLoggedIn(true);
    })
    .catch(err => {
      console.log(err);
      alert('Error logging in please try again - onsubmit - login');
    });
  }

    if (isLoggedIn) {
      console.log("login page id:",userid)
      fakeAuth.authenticate(userid);
      return <Redirect to="/" />;
    }
    return (
      <div>
      <form onSubmit={onSubmit} style={{textAlign:'center',marginTop:50}}>
        <h3>Login to your account 🙌🏻</h3>
        <label style={{width:150,textAlign:'left',marginTop:20}}>Email</label>
        <br/>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          required
          style={{wdith:250,height:30,marginTop:10, padding:4}}
        />
        <br/>
        <br/>
        <label>Password</label>
        <br/>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          required
          style={{wdith:250,height:30,marginTop:10 ,padding:4}}
        />
        <br/>
        <button type="submit" value="Submit" style={{width:180,height:30,marginTop:30}}>Login</button>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <label style={{color:"red",textAlign:'center',backgroundColor: message==="" ?  'white' :'#ffcccb',padding:8, borderRadius:10}}>{message}</label>
      </form>
      </div>
    );
}