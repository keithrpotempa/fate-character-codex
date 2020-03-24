import React, { useState, useEffect } from "react";
import { Card, Container } from "semantic-ui-react"
import ApiManager from "../../modules/ApiManager";
import SkillCard from "./SkillCard"

const SkillList = props => {
  const [skills, setSkills] = useState([]);

  const getSkills = () => {
    return ApiManager.getAll("skills")
      .then(setSkills);
  }

  useEffect(() => {
    getSkills();
  }, [])

  return (
    <>
      <Container text>
        <div className="header-container">
          <h1>Skills</h1>
        </div>
        <Card.Group stackable itemsPerRow={4}>
          {skills.map(skill => 
            <SkillCard
              key={skill.id}
              skill={skill}
            />  
          )}
        </Card.Group>
      </Container>
    </>
  )
}

export default SkillList