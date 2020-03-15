import React from "react";
import { Link } from "react-router-dom";
import "./Character.css";

const CharacterCard = props => {
  
  return (
    <>
      <div className="card">
        <div className="card-content character-card">
          <h3>
            {props.name}, {props.highConcept}
          </h3>
          <Link 
            to={`/characters/${props.id}`}
            handleDelete={props.handleDelete}
          >
            <button>Details</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default CharacterCard