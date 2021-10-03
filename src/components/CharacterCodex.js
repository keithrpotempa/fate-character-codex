import React from "react";

import { ProvideAuth } from "../hooks/useAuth";

import ApplicationViews from "./ApplicationViews";
import NavBar from "./nav/NavBar";
import Footer from "./footer/Footer"
import { ProvideFateRules } from "../hooks/useFateRules";

const CharacterCodex = () => {
  return (
    <ProvideAuth>
      <ProvideFateRules>
        <div className="App Site">
            <div className="Site-content">
              <div className="App-header">
                <NavBar/>
              </div>
              <div className="main">
                <ApplicationViews/>
              </div>
            </div>
          <Footer/>
        </div>
      </ProvideFateRules>
    </ProvideAuth>
  );
}

export default CharacterCodex;