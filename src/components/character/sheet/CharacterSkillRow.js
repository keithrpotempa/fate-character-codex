import React from "react";
import { List, Label } from "semantic-ui-react";


const CharacterSkillRow = props => {
  const skillRow = props.skillRow;
  const rating = props.rating;

  //FIXME: "each child in a list should contain a unique key" warning
  return (
    <>
      {skillRow.length > 0
        ? <List.Item key={`skillRating-${rating}`}>
            <List.Content>
              <strong>+{rating}:</strong>
              {skillRow.map(skill => 
                <Label key={`skillLabel-${skill}`}>
                  {skill}
                </Label>)}
            </List.Content>
          </List.Item>
        : <List.Item key={`skillRating-${rating}`} disabled/>
      }
    </>
    )
}

export default CharacterSkillRow