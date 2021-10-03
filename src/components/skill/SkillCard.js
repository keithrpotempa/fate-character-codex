import React from "react";
import { Card } from "semantic-ui-react";

const SkillCard = ({ skill: {name, url, summary} }) => {

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