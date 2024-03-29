import React from "react";
import { Divider, Grid } from "semantic-ui-react";
import AspectInput from "./AspectInput"
import { useFateRules } from "../../../hooks/useFateRules";

const AspectForm = ({
  subType: {
    name: typeName,
    maxAspects,
    aspectComment,
  },
  aspects,
  setAspects,
}) => {
  const { aspectTypes } = useFateRules();

  const handleFieldChange = evt => {
      const stateToChange = [...aspects]
      // Determining which aspect is being edited: #1-5
      const indexToChange = evt.target.id.split("-")[1]
      //TODO: make aspectTypeId here more dynamic and less hard-coded
      const getAspectTypeId = () => {
        if (indexToChange === "0") {
          return 0
        } else if (indexToChange === "1") {
          return 1
        } else if (indexToChange > "1") {
          return 2
        }
      }
      stateToChange[indexToChange] = {
        name: evt.target.value,
        aspectTypeId: getAspectTypeId()
      }
      setAspects(stateToChange)
  }

  const createAspectInputs = () => {
    let aspectInputs = [];
    for (let i = 0; i < maxAspects; i++) {
      let typeId;
      // TODO: make aspect type an option
      // and less hard-coded
      if (i === 0) {
        typeId = 0;
      } else if (i === 1) {
        typeId = 1;
      } else if (i > 1) {
        typeId = 2;
      }
      aspectInputs.push(
        <AspectInput 
          key={i}
          handleFieldChange={handleFieldChange} 
          aspects={aspects} 
          index={i} 
          typeId={typeId} 
          aspectTypes={aspectTypes}
          />
      )
    }
    return aspectInputs;
  }

  return (
    <>
      <Divider horizontal><h2>ASPECTS</h2></Divider>
      <Grid columns={2}>
        <Grid.Column width={10}>
          {createAspectInputs()}
        </Grid.Column>
        <Grid.Column width={6}>
          {/* TODO: make this look cleaner on render */}
          <h3>Aspects for {typeName}</h3>
          <p>{aspectComment}</p>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default AspectForm;