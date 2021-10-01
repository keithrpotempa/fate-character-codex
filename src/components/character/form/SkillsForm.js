import React from "react";
import { Divider, Grid } from "semantic-ui-react";
import SkillsMultiSelector from "./SkillsMultiSelector"

const SkillsForm = ({
  type,
  maxSkillRating,
  skillRatingComment,
  skillChoiceComment,
  setCharacterSkills,
  characterSkills,
  skillList,
}) => {
  
  // Value comes from the Semantic UI component
  // https://medium.com/@omallek/a-beginners-story-to-using-semantic-ui-react-24002da738e5
  const handleFieldChange = (evt, {name, value}) => {
    const skillIds = value
    const row = parseInt(name.split("-")[1]);
    const stateToChange = {...characterSkills}
    stateToChange[row] = skillIds
    setCharacterSkills(stateToChange);
    };

  const createSkillSelectors = () => {
    let skillSelectors = [];
    for (let i = 1; i <= maxSkillRating; i++) {
      /* Using this row prop to determine the "rating" 
        of a particular chosen skill */
      skillSelectors.push(
        <SkillsMultiSelector 
          row={`${i}`} 
          skillList={skillList} 
          characterSkills={characterSkills} 
          handleFieldChange={handleFieldChange} 
        /> 
      )
    }
    // Reverse the order so the highest skill rating is at the top
    return skillSelectors.reverse();
  }

  return (
    <>
      <Divider horizontal><h2>SKILLS</h2></Divider>
      <Grid columns={2}>
        <Grid.Column width={10}>
          {createSkillSelectors()}
        </Grid.Column>
        <Grid.Column width={6}>
          {/* TODO: make this look cleaner on render */}
          <h3>Skills for {type}</h3>
          <p>{skillRatingComment}</p>
          <p>{skillChoiceComment}</p>
        </Grid.Column>
      </Grid>
    </>
  )
}


export default SkillsForm;