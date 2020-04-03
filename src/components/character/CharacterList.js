import React, { useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { confirmAlert } from 'react-confirm-alert';
import { Card, Button, Icon, Container, Dropdown } from "semantic-ui-react"
import CharacterCard from "./CharacterCard";
import ApiManager from "../../modules/ApiManager";

const CharacterList = props => {
  const activeUser = JSON.parse(sessionStorage.getItem("credentials"));
  const filteredCharacters = props.filteredCharacters;
  /* State related to pagination 
  reference: https://www.npmjs.com/package/react-hooks-paginator
  */
  const pageLimit = 9;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

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
            .then(props.getCharacters)
        },
        {
          label: 'No',
          onClick: null
        }
      ]
    });
  }

  useEffect(() => {
    setCurrentData(filteredCharacters.slice(offset, offset + pageLimit))
  }, [offset, filteredCharacters])

  return (
    <>
      <Container text>
        <div className="header-container">
          <h1>Characters</h1>
        </div>
        <div>
          <Card.Group itemsPerRow={3}>
            {currentData.map(character => 
                <CharacterCard
                  key={character.id}
                  character={character}
                  highConcept={getHighConcept(character)}
                  handleDelete={() => handleDelete(character.id)}
                  activeUser={activeUser}
                />
              )
            }
          </Card.Group>
          <Paginator 
            totalRecords={filteredCharacters.length}
            pageLimit={pageLimit}
            pageNeighbours={2}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </Container>
    </>
  )
}

export default CharacterList