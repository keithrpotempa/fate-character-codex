import React from "react";
import { List, Label } from "semantic-ui-react";
import { useFateRules } from "../../../hooks/useFateRules";

const CharacterSkillRow = ({
  skillRow,
  rating,
}) => {

  const { skillList } = useFateRules();

  return (
    <>
      {skillRow.length > 0
        ? <List.Item key={`skillRating-${rating}`}>
            <List.Content>
              <strong>+{rating}:</strong>
              {skillRow.map(skillId => 
                <Label key={`skillLabel-${skillId}`}>
                  {skillList.find((s) => s.id === parseInt(skillId))?.name}
                </Label>)}
            </List.Content>
          </List.Item>
        : null
      }
    </>
    )
}

export default CharacterSkillRow