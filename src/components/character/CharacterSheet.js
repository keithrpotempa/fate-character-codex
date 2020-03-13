import React, { useEffect, useState } from "react";
import ApiManager from "../../modules/ApiManager";

const CharacterSheet = props => {
  const [character, setCharacter] = useState({});
  const [aspects, setAspects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCharacter = () => {
    ApiManager.get("characters", props.characterId)
      .then(setCharacter);
  }

  const getAspects = () => {
    ApiManager.getCharactersAspects(props.characterId)
      .then(setAspects);
  }

  useEffect(()=>{
    getCharacter();
    getAspects();
    setIsLoading(false);
  }, [])

  return (
    <>
      <div className="card">
        <div className="card-content">
          <p><strong>Name:</strong> {character.name}</p>
          <p><strong>Aspects:</strong></p>
          <ul>
            {aspects.map(aspect =>
              <li key={aspect.id}>
                {aspect.name}
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default CharacterSheet