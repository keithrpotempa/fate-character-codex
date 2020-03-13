import React, { useEffect, useState } from "react";
import ApiManager from "../../modules/ApiManager";

const CharacterSheet = props => {
  const [character, setCharacter] = useState({});
  const [aspects, setAspects] = useState([]);
  const [skillGroups, setSkillGroups] = useState([]);
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
      .then(makeSkillGroups)
      .then(setSkillGroups)
  }

  const makeSkillGroups = (skills) => {
    // Sort the skills so that the highest rating is at the top
    skills = skills.sort((a,b) =>  b.skillRating - a.skillRating)
    // Seed/start the skillGroups array with the char's highest skill rating
    const skillGroups = [{rating: skills[0].skillRating, skills: []}]
    /* 
      Loop over every skill the character has;
      if there's a matching group, 
      place it in that group's skills array, 
      otherwise, start a new group. 
    */
    skills.forEach(skill => {
      const skillName = skill.skill.name;
      const skillRating = skill.skillRating;
      const matchingGroup = skillGroups.find( ({rating}) => rating === skillRating)
      matchingGroup 
        ? matchingGroup.skills.push(skillName) 
        : skillGroups.push({rating: skillRating, skills: [skillName]})
    })
    console.log("skillGroups", skillGroups);
    return skillGroups;
  }

  useEffect(()=>{
    getCharacter();
    getAspects();
    getSkills()
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
          <p><strong>Skills:</strong></p>
          <ul>
            {skillGroups.map(group => 
              <li key={group.rating}>
                <strong>+{group.rating}:</strong> {group.skills.join(", ")}
              </li>  
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default CharacterSheet