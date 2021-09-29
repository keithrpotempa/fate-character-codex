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
        // href={`/characters/${character.id}`}
        header={character.name}
        description={highConcept}
        // FIXME: 
        // meta={`by: ${user.email}`}
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
            {/* FIXME: */}
            {/* {activeUser && activeUser.id === user.id */}
            {true
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