import React, { useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";

import { Card } from "semantic-ui-react"

import { useAuth } from "../../hooks/useAuth";
import { useFateRules } from "../../hooks/useFateRules";

import CharacterCard from "./CharacterCard";

/* 
  Child component of Characters
  this receives a list of characters
  (filtered or not) and renders them with pagination
*/
const CharacterList = ({ filteredCharacters, highConcepts, deleteCharacter }) => {
  const { user } = useAuth();
  const { characterSubTypes } = useFateRules();

  // State related to pagination 
  // reference: https://www.npmjs.com/package/react-hooks-paginator
  const PAGE_LIMIT = 8;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setCurrentData(filteredCharacters.slice(offset, offset + PAGE_LIMIT))
  }, [offset, filteredCharacters])

  if (characterSubTypes.length === 0) {
    return null;
  }

  return (
    <>
      <div className="header-container">
        <h1>Characters</h1>
      </div>
      <div>
        <Card.Group itemsPerRow={4}>
          {currentData.map(character => 
            <CharacterCard
              key={character.id}
              activeUser={user}
              character={character}
              highConcept={highConcepts.find((hc) => hc.characterId === character.id)?.name}
              subType={characterSubTypes.find((st) => st.id === character.characterSubTypeId)?.name}
              handleDelete={() => deleteCharacter(character.id)}
            />
            )
          }
        </Card.Group>
        <Paginator 
          totalRecords={filteredCharacters.length}
          pageLimit={PAGE_LIMIT}
          pageNeighbours={2}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  )
}

export default CharacterList