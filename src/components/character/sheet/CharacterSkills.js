import React from "react";
import { Divider, List } from "semantic-ui-react";
import CharacterSkillRow from "./CharacterSkillRow"

const CharacterSkills = props => {
  const skills = props.skills;

  return (
    <>
      <Divider horizontal>
        <h4>Skills</h4>
      </Divider>
      <List>
        {/* Take the keys of the skills dict (AKA their ratings)
          and map them [6,5,4], then use that array 
          to get that rating's array of skills 
          via square bracket notation
        */}
        {Object.keys(skills)
          // Sort the skills so that the highest rating is at the top
          .sort((a,b) =>  b - a)
          .map(rating => 
            <CharacterSkillRow 
              skillRow={skills[rating]}
              rating={rating}
            />)}
      </List>
    </>
  )

}

export default CharacterSkills;