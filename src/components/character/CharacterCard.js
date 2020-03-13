import React from "react";
import "./Character.css";

const CharacterCard = props => {
  
  return (
    <>
      <div className="card">
        <div className="card-content character-card">
          <h3>
            {props.name}, {props.highConcept}
          </h3>
        </div>
      </div>
    </>
  )
}

export default CharacterCard