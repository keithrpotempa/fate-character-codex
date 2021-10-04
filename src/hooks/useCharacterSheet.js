import { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import ApiManager from "../modules/ApiManager";

export const useCharacterSheet = (id, stuntList, skillList) => {
  const [character, setCharacter] = useState({});
  const [characterType, setCharacterType] = useState("");
  const [characterSubType, setCharacterSubType] = useState(EMPTY_CHARACTER);
  const [characterAspects, setCharacterAspects] = useState(EMPTY_ASPECTS);
  const [isLoading, setIsLoading] = useState(true);

  const [characterSkills, setCharacterSkills] = useState(EMPTY_SKILLS);
  const [characterStunts, setCharacterStunts] = useState(EMPTY_STUNTS);
  
  const [physiqueRating, setPhysiqueRating] = useState({});
  const [willRating, setWillRating] = useState({});

  // TODO: Code repeated elsewhere
  const deleteCharacter = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this character?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => ApiManager.delete("characters", id)
            // FIXME: no props
            // .then(history.push("/characters"))
        },
        {
          label: 'No',
          onClick: null
        }
      ]
    });
  }

  const resetCharacter = () => {
    setCharacterAspects(EMPTY_ASPECTS);
    setCharacterSkills(EMPTY_SKILLS);
    setCharacterStunts(EMPTY_STUNTS);
  }
  
  // FIXME: Mentioned above, this should be from a custom hook
  useEffect(()=>{
    const skillsByRating = (rawSkills, rating) => {
      // Converting the format of the db to the format of the form's state
      const filteredSkills = rawSkills.filter(skill => skill.skillRating === rating)
  
      // Note: at initial rendering, 
      // the skillList is not accessible at this point
      // so this trick keeps it from crashing...   
      let formattedSkills = []
      if (skillList.length > 0) {
        // Map a new array with the actual names of the skills,
        // found by matching the fk id from characterSkills and the skill list
        formattedSkills = filteredSkills.map(skill => skillList[skill.skillId].name)
      }
      return formattedSkills;
    }

    const getCharacterStunts = () => {
      ApiManager.getCharacterAttributes("characterStunts", id)
        .then(stunts => {
          let formattedStunts = [];
          // To keep this from crashing if stuntList hasn't loaded yet...
          if (stuntList.length > 0) {
            // Map a new array with the actual names of the stunts,
            // found by matching the fk id from characterStunts and the stunt list
            formattedStunts = stunts.map(stunt => stuntList[stunt.stuntId])
          }
          setCharacterStunts(formattedStunts)
        });
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
        })
          .then(setFormattedSkills)
    }

    getCharacterSkills();
    // FIXME: uncomment when you get skills to work...
    getCharacterStunts();
  }, [characterSkills, id, skillList, stuntList])

  useEffect(()=>{
    // Then we're editing and need to fetch
    if (id) {
      const getCharacter = () => {
        return ApiManager.get("characters", id)
          .then(character => {
            setCharacter(character)
            ApiManager.get("characterSubTypes", character.characterSubTypeId)
              .then(setCharacterSubType)
          });
      }
    
      // FIXME: not setting character aspects?
      const getCharacterAspects = () => {
        return ApiManager.getCharacterAttributes("characterAspects", id)
          .then(setCharacterAspects)
      }
  
      getCharacter();
      getCharacterAspects();
      setIsLoading(false);
    }
  }, [id])
  
  return {
    character,
    setCharacter,
    characterType,
    setCharacterType,
    characterSubType,
    setCharacterSubType,
    characterAspects,
    setCharacterAspects,
    characterSkills,
    setCharacterSkills,
    characterStunts,
    setCharacterStunts,
    physiqueRating,
    willRating,
    isLoading,
    setIsLoading,
    deleteCharacter,
    resetCharacter,
  }
}

const EMPTY_CHARACTER = { name: "", userId: "", characterSubTypeId: "", created: "", id: "", modified: "" }

const EMPTY_ASPECT = { name: "", characterId: "", id: "" }

  const EMPTY_ASPECTS = [
    {...EMPTY_ASPECT, aspectTypeId: 1},
    {...EMPTY_ASPECT, aspectTypeId: 2},
    {...EMPTY_ASPECT, aspectTypeId: 3},
    {...EMPTY_ASPECT, aspectTypeId: 3},
    {...EMPTY_ASPECT, aspectTypeId: 3},
  ];

  const EMPTY_SKILLS = {
    6: [],
    5: [],
    4: [],
    3: [],
    2: [],
    1: []
  }

  const EMPTY_STUNTS = {
    5: "",
    4: "",
    3: "",
    2: "",
    1: ""
  }