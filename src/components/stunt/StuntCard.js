import React from "react";
import { Card } from "semantic-ui-react";
import "./Stunt.css";

const StuntCard = ({ 
  stunt: { name: stuntName, description }, 
  skill: { name: skillName, url: stuntUrl } 
}) => {

  return (
    <>
      <Card
        raised
        header={stuntName}
        description={description}
        meta={`Associated Skill: ${skillName}`}
        // The following safely open a new tab
        href={stuntUrl}
        target="_blank" 
        rel="noopener"
      />
    </>
  )
}

export default StuntCard;