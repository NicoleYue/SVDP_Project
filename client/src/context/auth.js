// import { createContext, useContext } from 'react';

export const fakeAuth = {
    isAuthenticated: false,
    user_id:0,
    authenticate(id) {
      this.isAuthenticated = true;
      console.log("user_id 1",this.user_id)
      this.user_id = id;
      console.log("user_id 2",this.user_id)
      // setTimeout(cb, 100)
    },
    signout(id) {
      this.isAuthenticated = false;
      this.user_id = '';
      // setTimeout(cb, 100)
    }
  }