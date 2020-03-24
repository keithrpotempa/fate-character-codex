import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Icon } from "semantic-ui-react"
import "./Character.css";

const CharacterCard = props => {
  const character = props.character;
  const activeUser = props.activeUser;
  const user = props.character.user;

  return (
    <>
      <Card 
        raised
        href={`/characters/${character.id}`}
        header={character.name}
        description={props.highConcept}
        meta={`by: ${user.email}`}
        extra={
          /* Conditionally rendering these buttons 
          if the user created this character */
          activeUser && activeUser.id === user.id
          ? <div className="flex-end">  
            <Button className="ui button"
                onClick={props.handleDelete}
              >
              <Icon fitted className="trash alternate outline"/>
            </Button>
            <Button 
              className="ui button"
              onClick={() => props.history.push(`/characters/${character.id}/edit`)}
            >
              <Icon fitted className="edit outline"/>
            </Button>
          </div>
          : <></>
        }
      />

    </>
  )
}

export default CharacterCard