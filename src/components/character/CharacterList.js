import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import ApiManager from "../../modules/ApiManager";

const CharacterList = props => {
  const [characters, setCharacters] = useState([]);

  const getCharacters = () => {
    return ApiManager.getAllEmbed("characters", "characterAspects")
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
    ApiManager.delete("characters", id)
      .then(getCharacters)
  }

  useEffect(() => {
    getCharacters();
  }, [])

  return (
    <>
      <main>
        <div className="characters-wrapper">
          <button
            type="button"
            onClick={() => {props.history.push("/characters/new")}}
          >
            New Character
          </button>
          <div className="header-container">
            <h1>Characters</h1>
          </div>
          <div className="characters-container">
            {characters.map(character => 
              <CharacterCard
                key={character.id}
                name={character.name}
                id={character.id}
                highConcept={getHighConcept(character)}
                handleDelete={() => handleDelete(character.id)}
              />
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default CharacterList