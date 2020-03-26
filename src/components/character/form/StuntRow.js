import React from "react";
import { Form, Grid } from "semantic-ui-react";
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
      <Grid stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
            <SkillsDropDown 
              x={props.x} 
              handleFieldChange={handleFilter} 
              skillList={props.skillList}
              />
          </Grid.Column>
          <Grid.Column>
            <StuntsDropdown 
              x={props.x} 
              stuntList={props.stuntList} 
              setStuntList={props.setStuntList} 
              characterStunts={props.characterStunts} 
              setCharacterStunts={props.setCharacterStunts} 
              filter={props.filter}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
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