import React, { Link } from "react";
import "./Character.css";

const CharacterCard = props => {
  
  return (
    <>
      <div className="card">
        <div className="card-content character-card">
          <h3>
            {props.name}, {props.highConcept}
          </h3>
          {/* FIXME: <Link to={`/characters/${props.id}`}>
            <button>Details</button>
          </Link> */}
        </div>
      </div>
    </>
  )
}

export default CharacterCard