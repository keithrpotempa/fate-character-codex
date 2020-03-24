import React from "react";
import { Grid } from "semantic-ui-react";
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
    <>
      {/* <div className="stunt-form-container">*/}
      {/*   <div className="stunt-dropdowns-container"> */}
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
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
          </Grid.Column>
          <Grid.Column>
            <StuntDescription 
              stunt={props.characterStunts[props.x]} 
              stuntList={props.stuntList}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default StuntRow;