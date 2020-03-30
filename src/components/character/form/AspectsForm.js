import React, { useEffect, useState } from "react";
import { Divider, Grid } from "semantic-ui-react";
import AspectInput from "./AspectInput"
import ApiManager from "../../../modules/ApiManager"

const AspectForm = props => {
  const type = props.type;
  const aspects = props.aspects;
  const maxAspects = props.maxAspects;
  const aspectComment = props.aspectComment;
  const [aspectTypes, setAspectTypes] = useState([]);

  const handleFieldChange = evt => {
      const stateToChange = [...aspects]
      // Determining which aspect is being edited: #1-5
      const indexToChange = evt.target.id.split("-")[1]
      //TODO: make aspectTypeId here more dynamic and less hard-coded
      const getAspectTypeId = () => {
        if (indexToChange === "0") {
          return 1
        } else if (indexToChange === "1") {
          return 2
        } else if (indexToChange > "1") {
          return 3
        }
      }
      stateToChange[indexToChange] = {
        name: evt.target.value,
        aspectTypeId: getAspectTypeId()
      }
      props.setAspects(stateToChange)
  }

  const getAspectTypes = () => {
    ApiManager.getAll("aspectTypes")
      .then(setAspectTypes)
  }

  const createAspectInputs = () => {
    let aspectInputs = [];
    for (let i = 0; i < maxAspects; i++) {
      let typeId;
      // TODO: make aspect type an option
      // and less hard-coded
      if (i === 0) {
        typeId = 1;
      } else if (i === 1) {
        typeId = 2;
      } else if (i > 1) {
        typeId = 3;
      }
      aspectInputs.push(
        <AspectInput 
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

  useEffect(() => {
    getAspectTypes();
  },[])

  // TODO: fix up the value to be less hackey
  return (
    <>
      <Divider horizontal><h2>ASPECTS</h2></Divider>
      <Grid columns={2}>
        <Grid.Column>
          {createAspectInputs()}
        </Grid.Column>
        <Grid.Column>
          {/* TODO: make this look cleaner on render */}
          <h3>Aspects for {type}</h3>
          <p>{aspectComment}</p>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default AspectForm;