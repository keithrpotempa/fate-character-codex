import React, { useEffect } from "react";
import ApiManager from "../../../modules/ApiManager";

/*
  This component is only rendered on the MainForm 
  if a character is being edited.
  
  It retrieves all of that character's data from the
  database and puts it in state in the format of the form
*/

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
    // Get all of the characters' data and put it in state
    ApiManager.getCharacterWithType(characterId)
      .then(character => setCharacterToEdit(character))
    ApiManager.getCharacterAspects(characterId)
      .then(aspects => setAspectsToEdit(aspects))
    ApiManager.getCharacterSkills(characterId)
      .then(skills => setSkillsToEdit(skills))
    ApiManager.getCharacterStunts(characterId)
      .then(stunts => setStuntsToEdit(stunts))
      .then(() => setIsLoading(false))
  }

  const setCharacterToEdit = (character) => {
    console.log(character)   
    const subtype = character.characterSubTypeId;
    const type = character.characterSubType.characterTypeId;

    const characterToEdit = {
      name: character.name, 
      type: `${type}`, 
      subtype: `${subtype}`,
      created: character.created
    }
    console.log(characterToEdit)

    setCharacter(characterToEdit);
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