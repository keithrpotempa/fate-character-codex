import React from "react";
import { Divider, List, Label } from "semantic-ui-react";

const CharacterSkills = props => {
  const skills = props.skills;

  const SkillLi = (skillRow, rating) => {
    return (
      <>
        {skillRow.length > 0
          ? <List.Item key={`skillRating-${rating}`}>
              <strong>+{rating}:</strong>
              {skillRow.map(skill => <Label key={skill.id}>{skill}</Label>)}
            </List.Item>  
          : <></>
        }
      </>
      )
  }

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
          .map(rating => SkillLi(skills[rating], rating))
        }
      </List>
    </>
  )

}

export default CharacterSkills;