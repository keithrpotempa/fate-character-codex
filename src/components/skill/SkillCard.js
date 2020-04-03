import React from "react";
import { Card } from "semantic-ui-react";
// import "./Skill.css";

const SkillCard = props => {
  const name = props.skill.name;
  const url = props.skill.url;
  const summary = props.skill.summary;

  return (
    <>
      <Card
        raised
        header={name}
        description={summary}
        // The following safely open a new tab
        href={url} 
        target="_blank" 
        rel="noopener"
        
      />
    </>
  )
}

export default SkillCard;