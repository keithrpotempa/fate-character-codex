import React from "react";
import "./Stunt.css";

const StuntCard = props => {
  const name = props.stunt.name;
  const description = props.stunt.description;
  const skill = props.stunt.skill.name;
  // const skillUrl = props.stunt.skill.url;

  return (
    <>
      <div className="card">
        <div className="card-content stunt-card">
          <p>
            <strong>{name}</strong>: {description}
          </p>
          <div className="associated-skill">
            <p>
              Associated Skill: {skill}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default StuntCard;