import React from "react";

const SkillCard = props => {
  const name = props.skill.name
  const url = props.skill.url

  return (
    <>
      <div className="card">
        <div className="card-content">
          <p>
            <strong>{name}</strong>
            <a href={url}>Link</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default SkillCard;