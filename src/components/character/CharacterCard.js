import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Icon } from "semantic-ui-react"
import "./Character.css";

const CharacterCard = props => {
  const character = props.character
  const activeUser = props.activeUser

  return (
    <>
      <Card 
        href={`/characters/${character.id}`}
        header={character.name}
        description={props.highConcept}
        extra={
          /* Conditionally rendering these buttons 
          if the user created this character */
          activeUser.id === character.userId
          ? <>  
            <button className="ui button"
                onClick={props.handleDelete}
              >
              <Icon fitted className="trash alternate outline"/>
            </button>
            <Link to={`/characters/${character.id}/edit`}>
              <button className="ui button">
                <Icon fitted className="edit outline"/>
              </button>
            </Link> 
          </>
          : <></>
        }
      />

    </>
  )
}

export default CharacterCard