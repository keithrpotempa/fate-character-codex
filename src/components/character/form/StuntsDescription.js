import React from "react";
import { Form } from "semantic-ui-react";

const StuntDescription = props => {
  const stuntList = props.stuntList;
  const selectedStunt = props.stunt;
  const stuntToDisplay = stuntList.find(stunt => stunt.id === parseInt(selectedStunt))
  const stuntDescription = stuntToDisplay ? stuntToDisplay.description : "" 

  return (
    <>
      <Form.Field
        control="textarea"
        readOnly
        className="stunt-description"
        value={stuntDescription}
      />
    </>
  )
}

export default StuntDescription;