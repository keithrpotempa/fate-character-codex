import React, { useEffect, useState } from "react";
import { Divider } from "semantic-ui-react";
import AspectInput from "./AspectInput"
import ApiManager from "../../../modules/ApiManager"

const AspectForm = props => {
  const aspects = props.aspects
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

  useEffect(() => {
    getAspectTypes();
  },[])

  // TODO: fix up the value to be less hackey
  return (
    <>
      <Divider horizontal><h2>ASPECTS</h2></Divider>
      <AspectInput handleFieldChange={handleFieldChange} aspects={aspects} index="0" typeId="1" aspectTypes={aspectTypes}/>
      <AspectInput handleFieldChange={handleFieldChange} aspects={aspects} index="1" typeId="2" aspectTypes={aspectTypes}/>
      <AspectInput handleFieldChange={handleFieldChange} aspects={aspects} index="2" typeId="3" aspectTypes={aspectTypes}/>
      <AspectInput handleFieldChange={handleFieldChange} aspects={aspects} index="3" typeId="3" aspectTypes={aspectTypes}/>
      <AspectInput handleFieldChange={handleFieldChange} aspects={aspects} index="4" typeId="3" aspectTypes={aspectTypes}/>
    </>
  )
}

export default AspectForm;