import React, { useEffect, useState } from "react";
import ApiManager from "../../modules/ApiManager";

const CharacterSheet = props => {
  const [character, setCharacter] = useState({});
  const [aspects, setAspects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCharacter = () => {
    ApiManager.get("characters", props.characterId)
      .then(setCharacter);
  }

  const getAspects = () => {
    ApiManager.getCharacterAspects(props.characterId)
      .then(setAspects);
  }

  const getSkills = () => {
    ApiManager.getCharacterSkills(props.characterId)
      .then(setSkills);
  }

  useEffect(()=>{
    getCharacter();
    getAspects();
    getSkills();
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
          <ul>
            {skills.map(skill => 
              <li key={skill.id}>
                {skill.skill.name}, {skill.skillRating}
              </li>  
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default CharacterSheet