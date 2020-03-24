import React, { useState, useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert';
import { Card, Button, Icon, Container } from "semantic-ui-react"
import CharacterCard from "./CharacterCard";
import ApiManager from "../../modules/ApiManager";

const CharacterList = props => {
  const [characters, setCharacters] = useState([]);
  const activeUser = JSON.parse(sessionStorage.getItem("credentials"));

  const getCharacters = () => {
    ApiManager.getCharacterList()
      .then(setCharacters)
  }

  const getHighConcept = (character) => {
    const aspects = character.characterAspects;
    /* 
      Filter out everything that isn't 
      a High Concept (type of 1)
      Return the .name property of the only aspect
      remaining in the array  
      (there's only ever one High Aspect)
    */
    const highConcept = aspects.filter(aspect => {
      return aspect.aspectTypeId === 1;
    })[0].name
    return highConcept;
  }

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this character?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => ApiManager.delete("characters", id)
            .then(getCharacters)
        },
        {
          label: 'No',
          onClick: null
        }
      ]
    });
  }

  useEffect(() => {
    getCharacters();
  }, [])

  return (
    <>
      <Container text>
        <Button
          type="button"
          onClick={() => {props.history.push("/characters/new")}}
        >
          <Icon className="add user"></Icon>
        </Button>
        <div className="header-container">
          <h1>Characters</h1>
        </div>
        <div>
          <Card.Group itemsPerRow={3}>
            {characters.map(character => 
              <CharacterCard
                key={character.id}
                character={character}
                highConcept={getHighConcept(character)}
                handleDelete={() => handleDelete(character.id)}
                activeUser={activeUser}
              />
            )}
          </Card.Group>
        </div>
      </Container>
    </>
  )
}

export default CharacterList