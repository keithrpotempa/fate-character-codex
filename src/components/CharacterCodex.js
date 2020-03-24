import React, { useState } from "react";
import ApplicationViews from "./ApplicationViews";
import NavBar from "./nav/NavBar";
import Footer from "./footer/Footer"

const CharacterCodex = () => {
    // Check if credentials are in session storage returns true/false
    const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

    // Will be passing this state down to reroute users who are not "logged in"
    const [hasUser, setHasUser] = useState(isAuthenticated())
    
    const setUser = user => {
      sessionStorage.setItem("credentials", JSON.stringify(user));
      setHasUser(isAuthenticated());
    }
  
    const clearUser = () => {
      sessionStorage.clear();
      setHasUser(isAuthenticated());
    }

  return (
    <>
      <div className="App Site">
          <div className="Site-content">
            <div className="App-header">
              <NavBar hasUser={hasUser} clearUser={clearUser}/>
            </div>
            <div className="main">
              <ApplicationViews hasUser={hasUser} setUser={setUser}/>
            </div>
          </div>
        <Footer/>
      </div>
    </>
  );
}

export default CharacterCodex;