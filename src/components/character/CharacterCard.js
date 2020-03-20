import React from "react";
import { Link } from "react-router-dom";
import "./Character.css";

const CharacterCard = props => {
  const character = props.character
  const activeUser = props.activeUser

  return (
    <>
      <div className="card">
        <div className="card-content character-card">
          <h3>
            {character.name}, {props.highConcept}
          </h3>
          <Link to={`/characters/${character.id}`}>
            <button>Details</button>
          </Link>
          {/* Conditionally rendering these buttons 
              if the user created this character */}
          {activeUser.id === character.userId
            ? <Link to={`/characters/${character.id}/edit`}>
                <button>Edit</button>
              </Link> 
            : null
          }
          {activeUser.id === character.userId
            ? <button
                onClick={props.handleDelete}
              >
                Delete
              </button>
            : null
          }
        </div>
      </div>
    </>
  )
}

export default CharacterCard