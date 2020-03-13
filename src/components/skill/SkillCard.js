import React from "react";
import "./Skill.css";

const SkillCard = props => {
  const name = props.skill.name
  const url = props.skill.url

  return (
    <>
      <div className="card">
        <div className="card-content">
          <p>
            <strong>{name}</strong>
          </p>
          <p>
            <a href={url}>Link</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default SkillCard;