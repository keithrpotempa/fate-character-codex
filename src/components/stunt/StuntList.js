import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import StuntCard from "./StuntCard"

const StuntList = props => {
  const [stunts, setStunts] = useState([]);

  const getStunts = () => {
    return ApiManager.getAllExpand("stunts", "skill")
      .then(setStunts);
  }

  useEffect(() => {
    getStunts();
  }, [])

  return (
    <>
      <main>
        <div className="stunts-wrapper">
          <div className="header-container">
            <h1>Stunts</h1>
          </div>
          <div className="stunts-container">
            {stunts.map(stunt => 
              <StuntCard
                key={stunt.id}
                stunt={stunt}
              />  
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default StuntList