import React from "react";
import "./Character.css";

const CharacterCard = props => {
  const name = props.character.name;
  
  return (
    <>
      <div className="card">
        <div className="card-content">
          <h3>
            Name: {name}
          </h3>
        </div>
      </div>
    </>
  )
}

export default CharacterCard