import React from "react";
import StuntsDropdown from "./StuntsDropdown";
import StuntDescription from "./StuntsDescription";
import SkillsDropDown from "./SkillsDropDown";

const StuntRow = props => {
  const setFilter = props.setFilter;

  const handleFilter = (evt, {name, value}) => {
    const valueToSet = parseInt(value)
    setFilter(valueToSet)
  }

  return (
    <div className="stunt-form-container">
      <div className="stunt-dropdowns-container">
        <SkillsDropDown 
          x={props.x} 
          handleFieldChange={handleFilter} 
          skillList={props.skillList}
        />
        <StuntsDropdown 
          x={props.x} 
          stuntList={props.stuntList} 
          setStuntList={props.setStuntList} 
          characterStunts={props.characterStunts} 
          setCharacterStunts={props.setCharacterStunts} 
          filter={props.filter}
        />
      </div>
    <StuntDescription 
      stunt={props.characterStunts[props.x]} 
      stuntList={props.stuntList}
    />
  </div>
  )
}

export default StuntRow;