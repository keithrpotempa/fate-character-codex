import React from "react";
import { Divider, Grid } from "semantic-ui-react";

import StuntRow from "./StuntRow";
import "../Character.css";

const StuntsForm = props => {
  const setCharacterStunts = props.setCharacterStunts;
  const characterStunts = props.characterStunts;
  const stuntList = props.stuntList;
  const setStuntList = props.setStuntList;
  const type = props.type;
  const maxStunts = props.maxStunts;
  const stuntComment = props.stuntComment;

  const createStuntRow = () => {
    let stuntRows = [];
    for (let i = 1; i <= maxStunts; i++) {
      stuntRows.push(
        <StuntRow 
          x={`${i}`}  
          stuntList={stuntList} 
          setStuntList={setStuntList} 
          characterStunts={characterStunts} 
          setCharacterStunts={setCharacterStunts} 
          skillList={props.skillList}
        />
      )
    }
    return stuntRows;
  }

  return (
    <>
      <Divider horizontal><h2>STUNTS</h2></Divider>
        <Grid columns={2}>
          <Grid.Column width={10}>
            {/* If a character subtype requires no stunts,
              do not render the component for them to choose one */}
            {maxStunts > 0
              ? <>
                  <p>(choose a skill to filter by)</p>
                  {createStuntRow()}
                </>
              : <></>
            }
          </Grid.Column>
          <Grid.Column width={6}>
            {/* TODO: make this look cleaner on render */}
            <h3>Stunts for {type}</h3>
            <p>{stuntComment}</p>
          </Grid.Column>
        </Grid>
    </>
  )
}

export default StuntsForm;