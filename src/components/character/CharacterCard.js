import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Icon, Label } from "semantic-ui-react"

import "./Character.css";

const CharacterCard = ({
  character,
  highConcept,
  subType,
  activeUser,
  handleDelete,
}) => {

  return (
    <>
      <Card 
        raised
        header={character.name}
        description={highConcept}
        // TODO: Show the user that created it
        // meta={`by: ${character.userId.email}`}
        extra={
          <>
            {/* A label detailing what character subtype they are  */}
            <Label
              tag
              color="blue"
              size="tiny"
              content={subType}
            />
            {/* Conditionally rendering these buttons 
            if the user created this character */}
            {activeUser && activeUser?.uid === character.userId
            ? <div className="flex-end">
                <Link to={`/characters/${character.id}`}>
                  <Button 
                    className="ui button"
                  >
                    <Icon fitted className="file outline"/>
                  </Button>
                </Link>  
                <Button className="ui button"
                    onClick={handleDelete}
                  >
                  <Icon fitted className="trash alternate outline"/>
                </Button>
                <Link to={`/characters/${character.id}/edit`}>
                  <Button 
                    className="ui button"
                  >
                    <Icon fitted className="edit outline"/>
                  </Button>
                </Link>
              </div>
            : <div className="flex-end">
              <Link to={`/characters/${character.id}`}>
                <Button 
                  className="ui button"
                >
                  <Icon fitted className="file outline"/>
                </Button>
              </Link>  
            </div>
            }
          </>
        }
      />

    </>
  )
}

export default CharacterCard