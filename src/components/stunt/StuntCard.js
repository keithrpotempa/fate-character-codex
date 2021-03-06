import React from "react";
import { Card } from "semantic-ui-react";
import "./Stunt.css";

const StuntCard = props => {
  const name = props.stunt.name;
  const description = props.stunt.description;
  const skill = props.stunt.skill.name;
  const skillUrl = props.stunt.skill.url;

  return (
    <>
      <Card
        raised
        header={name}
        description={description}
        meta={`Associated Skill: ${skill}`}
        // The following safely open a new tab
        href={skillUrl}
        target="_blank" 
        rel="noopener"
      />
    </>
  )
}

export default StuntCard;