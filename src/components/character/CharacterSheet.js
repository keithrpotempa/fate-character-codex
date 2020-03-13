import React, { useEffect, useState } from "react";
import ApiManager from "../../modules/ApiManager";

const CharacterSheet = props => {
  const [character, setCharacter] = useState({});
  const [aspects, setAspects] = useState([]);
  const [skillGroups, setSkillGroups] = useState([]);
  const [physiqueRating, setPhysiqueRating] = useState({});
  const [willRating, setWillRating] = useState({});
  const [stunts, setStunts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const id = props.characterId;

  const getCharacter = () => {
    ApiManager.get("characters", id)
      .then(setCharacter);
  }

  const getAspects = () => {
    ApiManager.getCharacterAspects(id)
      .then(setAspects);
  }

  const getSkills = () => {
    ApiManager.getCharacterSkills(id)
      // Before the skills are sorted into a weird format to output
      // we extract the rating of will and physique to use later
      .then(skills => {
        setWillRating(skills.find( ({skillId}) => skillId === 18).skillRating)
        setPhysiqueRating(skills.find( ({skillId}) => skillId === 12).skillRating)
        return skills
      })
      .then(makeSkillGroups)
      .then(setSkillGroups)
  }

  const getStunts = () => {
    ApiManager.getCharacterStunts(id)
      .then(setStunts);
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
    return skillGroups;
  }

  const makeStressBoxes = (stressType) => {
    // If stresstype rating is 1-2, they get 1, 2, 3 boxes
    // If 3-4, they get 1, 2, 3, 4 boxes
    // If 5+, they also get a mild consequence slot 
    let rating;
    if (stressType === "physical") {
      rating = physiqueRating;
    } else if (stressType === "mental") {
      rating = willRating;
    }

    const checkBox = (number) => {
      return (
        <>
          <strong>{number}</strong><input type="checkbox"/>
        </>
      )
    }

    // TODO: make this DRY-er
    if (rating < 0) {
      return (
        <>
          {checkBox(1)}
          {checkBox(2)}
        </>
      ) 
    } else if (rating <= 2 ) {
      return (
        <>
          {checkBox(1)}
          {checkBox(2)}
          {checkBox(3)}
      </>
      ) 
    } else if (rating >= 3 ) {
      return (
        <>
          {checkBox(1)}
          {checkBox(2)}
          {checkBox(3)}
          {checkBox(4)}
      </>
      )
  }
}

  useEffect(()=>{
    getCharacter();
    getAspects();
    getSkills();
    getStunts();
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
              <li key={"aspect-" + aspect.id}>
                {aspect.name}
              </li>
            )}
          </ul>
          <p><strong>Skills:</strong></p>
          <ul>
            {skillGroups.map(group => 
              <li key={"skillRating-" + group.rating}>
                <strong>+{group.rating}:</strong> {group.skills.join(", ")}
              </li>  
            )}
          </ul>
          <p><strong>Stunts:</strong></p>
          <ul>
            {stunts.map(stunt => 
              <li key={"stunt-" + stunt.stunt.id }>
                <strong>{stunt.stunt.name}:</strong> {stunt.stunt.description}
              </li>
            )}
          </ul>
          <p><strong>Physical Stress:</strong></p>
          <div className="stress-boxes-container">
            {makeStressBoxes("physical")}
          </div>
          <p><strong>Mental Stress:</strong></p>
          <div className="stress-boxes-container">
            {makeStressBoxes("mental")}
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterSheet