import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Icon, Label } from "semantic-ui-react"

import "./Character.css";
import ApiManager from "../../modules/ApiManager";

const CharacterCard = ({
  character,
  activeUser,
  handleDelete,
}) => {

  // FIXME: fetching should not happen this far down; fetch once all the high concepts and character subtypes
  // at a higher level, and then pass them down to this card
  const [highConcept, setHighConcept] = useState("");
  const [subType, setSubType] = useState("");
  
  useEffect(() => {
    ApiManager.getHighConcept(character.id)
      .then(setHighConcept)
    ApiManager.get("characterSubTypes", character.characterSubTypeId)
      .then(subType => setSubType(subType.name))
  }, [character])

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