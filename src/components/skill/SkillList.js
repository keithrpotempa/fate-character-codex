import React, { useState, useEffect } from "react";
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
      <div className="skills-wrapper">
        <div className="header-container">
          <h1>Skills</h1>
        </div>
        {skills.map(skill => 
          <SkillCard
            key={skill.id}
            skill={skill}
          />  
        )}
      </div>
    </>
  )
}

export default SkillList