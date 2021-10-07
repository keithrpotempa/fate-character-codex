import React from "react";
import { Container, Loader } from "semantic-ui-react"
import CharacterList from "../character/CharacterList"

import { useFateRules } from "../../hooks/useFateRules";
import { useCharacterList } from "../../hooks/useCharacters";
import { useCharacterFilter } from "../../hooks/useCharacterFilter";
import CharacterFilterDropdowns from "../character/CharacterFilterDropdowns";

/* 
  Parent component of CharacterList
  it retrieves all the characters, puts them in state
  handles the type and subtype filters, and passes
  a filtered list of characters to CharacterList
*/
const Characters = props => {
  const { characterSubTypesByType, isLoading: fateRulesLoading } = useFateRules();
  const { characters, isLoading: characterListLoading, highConcepts, deleteCharacter } = useCharacterList();

  const { filter, filteredCharacters, handleFilterFieldChange } = useCharacterFilter(characters, characterSubTypesByType);

  return (
    <>
      <Container>
        <CharacterFilterDropdowns 
          handleFilterFieldChange={handleFilterFieldChange}
          filter={filter}
          {...props}
        />
        {fateRulesLoading || characterListLoading
          ? <Loader active inline='centered' />
          :  (
            <CharacterList 
              filteredCharacters={
                filter.type !== "" || filter.subtype !== ""
                  ? filteredCharacters
                  : characters
              }
              highConcepts={highConcepts}
              deleteCharacter={deleteCharacter} 
            />
          )
        }
      </Container>
    </>
  )
}

export default Characters