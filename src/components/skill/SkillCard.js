import React from "react";
import { Card } from "semantic-ui-react";
// import "./Skill.css";

const SkillCard = props => {
  const name = props.skill.name;
  const url = props.skill.url;

  return (
    <>
      <Card
        raised
        header={name}
        // The following safely open a new tab
        href={url} 
        target="_blank" 
        rel="noopener"
      />
    </>
  )
}

export default SkillCard;