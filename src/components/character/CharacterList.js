import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import ApiManager from "../../modules/ApiManager";

const CharacterList = props => {
  const [characters, setCharacters] = useState([]);

  const getCharacters = () => {
    return ApiManager.getAll("characters")
      .then(setCharacters)
  }

  useEffect(() => {
    getCharacters();
  }, [])

  return (
    <>
      <div className="container-cards">
        {characters.map(character => 
          <CharacterCard
            key={character.id}
            character={character}
          />
        )}
      </div>
    </>
  )
}

export default CharacterList