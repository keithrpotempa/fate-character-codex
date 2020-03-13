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
      <main>
        <div className="skills-wrapper">
          <div className="header-container">
            <h1>Skills</h1>
          </div>
          <div className="skills-container">
            {skills.map(skill => 
              <SkillCard
                key={skill.id}
                skill={skill}
              />  
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default SkillList