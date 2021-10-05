import { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";

export const useCharacterSkills = (id, skillList) => {
  const [isLoading, setIsLoading] = useState(false);

  const [characterSkills, setCharacterSkills] = useState(EMPTY_SKILLS);
  // const [characterSkillsByRating, setCharacterSkillsByRating] = useState(EMPTY_SKILLS);
  
  const [physiqueRating, setPhysiqueRating] = useState({});
  const [willRating, setWillRating] = useState({});

  const resetSkills = () => {
    setCharacterSkills(EMPTY_SKILLS);
  }

  const saveCharacterSkills = (characterId) => {
    for (const row in characterSkills) {
      const skillsAtRating = characterSkills[row]
      const rating = row
      if (skillsAtRating.length > 0) {
        skillsAtRating.forEach(skill => {
          const skillToSave = {
            characterId: characterId,
            skillId: parseInt(skill),
            skillRating: parseInt(rating),
          }
          return ApiManager.push("characterSkills", skillToSave);
        })
      }
    }
  } 

  useEffect(()=>{
    const skillsByRating = (skills, rating) => {
      // Converting the format of the db to the format of the form's state
      const filteredSkills = skills.filter(skill => skill.skillRating === rating)
      const formattedSkills = filteredSkills.map(skill => skill.skillId.toString())
      return formattedSkills;
    }

    const setFormattedSkills = (rawSkills) => {
      const stateToChange = {...characterSkills};
      // TODO: Make this loop more adaptable to different range of rating levels
      for (let i = 1; i < 7; i++) {
        stateToChange[i] = skillsByRating(rawSkills, i)
      } 
      setCharacterSkills(stateToChange)
    }

    const getCharacterSkills = () => {
        ApiManager.getCharacterAttributes("characterSkills", id)
          .then(rawSkills => {
            // Before the skills are sorted into a weird format to output
            // we extract the rating of will and physique to use later
            // If they don't have a rating, consider it to be zero
            const will = rawSkills.find( ({skillId}) => skillId === 18)
            will ? setWillRating(will.skillRating) : setWillRating(0)
      
            const physique = rawSkills.find( ({skillId}) => skillId === 12)
            physique ? setPhysiqueRating(physique.skillRating) : setPhysiqueRating(0)
            return rawSkills
          }).then(setFormattedSkills)
      }
      
      if (id) {
        getCharacterSkills();
      };

  }, [characterSkills, id, skillList])

  return {
    isLoading,
    setIsLoading,
    characterSkills,
    setCharacterSkills,
    physiqueRating,
    willRating,
    resetSkills,
    saveCharacterSkills,
  }
}

const EMPTY_SKILLS = {
  6: [],
  5: [],
  4: [],
  3: [],
  2: [],
  1: []
}
