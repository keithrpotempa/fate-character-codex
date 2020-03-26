import React, { useEffect } from "react";
import ApiManager from "../../../modules/ApiManager";

const EditCharacter = props => {
  const characterId = props.characterId;
  const setCharacter = props.setCharacter;
  const characterAspects = props.characterAspects;
  const setCharacterAspects = props.setCharacterAspects;
  const characterSkills = props.characterSkills;
  const setCharacterSkills = props.setCharacterSkills;
  const characterStunts = props.characterStunts;
  const setCharacterStunts = props.setCharacterStunts;
  const setIsLoading = props.setIsLoading;

  const editSetup = () => {
    // Get alll of the characters' data and put it in state
    ApiManager.get("characters", characterId)
      .then(character => setCharacter(character))
    ApiManager.getCharacterAspects(characterId)
      .then(aspects => setAspectsToEdit(aspects))
    ApiManager.getCharacterSkills(characterId)
      .then(skills => setSkillsToEdit(skills))
    ApiManager.getCharacterStunts(characterId)
      .then(stunts => setStuntsToEdit(stunts))
      .then(() => setIsLoading(false))
  }
  
  const setAspectsToEdit = (aspects) => {
    const stateToChange = [...characterAspects];
    // TODO: Make this loop more adaptable to different range of rating levels
    for (let i = 0; i < 7; i++) {
      const aspect = aspects[i]
      if (aspect) {
        stateToChange[i] = {name: aspect.name, aspectTypeId: aspect.aspectTypeId}
      }
    } 
    setCharacterAspects(stateToChange)
  }

  const setSkillsToEdit = (skills) => {
    const stateToChange = {...characterSkills};
    // TODO: Make this loop more adaptable to different range of rating levels
    for (let i = 1; i < 7; i++) {
      stateToChange[i] = skillsByRating(skills, i)
    } 
    setCharacterSkills(stateToChange)
  }

  const setStuntsToEdit = (stunts) => {
    const stateToChange = {...characterStunts};
    // TODO: Make this loop more adaptable to different range of stunt numbers
    stunts.forEach(function(stunt, index) {
      if (stunt.stuntId !== "0") {
        return stateToChange[ index + 1] = stunt.stuntId.toString();       
      }
    }) 
    setCharacterStunts(stateToChange)
  }

  const skillsByRating = (skills, rating) => {
    // Converting the format of the db to the format of the form's state
    const filteredSkills = skills.filter(skill => skill.skillRating === rating)
    const formattedSkills = filteredSkills.map(skill => skill.skillId.toString())
    return formattedSkills;
  }

  useEffect(() => {
    editSetup();
  }, [])

  return (
    <>
    </>
  )
}

export default EditCharacter;