import React, { useEffect, useState } from "react";
import SheetPreview from "../sheet/SheetPreview";

//Sheet Review will format all the information properly to 
// run it through the preview

const SheetReview = props => {
  const character = props.character;
  const aspects = props.aspects;
  const skills = props.skills;
  const stunts = props.stunts;
  const skillList = props.skillList;
  const stuntList = props.stuntList;
  // TODO: GET THIS INFO HERE AND PASS IT ON AS PROPS
  // const physiqueRating = props.physiqueRating;
  // const willRating = props.willRating;

  // TODO: pass on skills and stunts as names/descriptions
  const [characterSkillNames, setCharacterSkillNames] = useState({
    6: [],
    5: [],
    4: [],
    3: [],
    2: [],
    1: []
  });

  const [characterStuntDetails, setCharacterStuntDetails] = useState([]);

  const getSkillNames = () => {
    const stateToChange = {...characterSkillNames};
    // Converting the skillId to names for preview purposes
    // TODO: Make this loop more adaptable to different range of rating levels
    for (let i = 1; i < 7; i++) {
      stateToChange[i] = skills[i].map(skillId => {
        return skillList.find(skill => skillId === skill.id).name
      })
    } 
    setCharacterSkillNames(stateToChange)
  }

  const getStuntNames = () => {
    const stateToChange = [...characterStuntDetails];
    // Converting the stuntId to name & description for preview purposes
    // TODO: Make this loop more adaptable to different range of rating levels
    for (let i = 0; i < 5; i++) {
      const stuntMatch = stuntList.find(stunt => parseInt(stunts[i+1]) === stunt.id)
      if (stuntMatch) {
        // This formatting is intentionally weird, 
        // to match that of the sheet's, which is retrieving
        // stunts from an expanded api call:
        stateToChange[i] = {stunt: stuntMatch}
      }
    }
    console.log(stateToChange)
    setCharacterStuntDetails(stateToChange)
  }


  useEffect(() => {
    getSkillNames();
    getStuntNames();
  }, [])

  return (
    <SheetPreview
      character={character}
      aspects={aspects}
      skills={characterSkillNames}
      stunts={characterStuntDetails}
    />
  )
}

export default SheetReview;