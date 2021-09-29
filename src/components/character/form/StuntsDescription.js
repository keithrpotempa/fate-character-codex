import React from "react";
import { Form, TextArea } from "semantic-ui-react";

const StuntDescription = ({
  stuntList,
  selectedStunt
}) => {
  const stuntToDisplay = stuntList.find(stunt => stunt.id === parseInt(selectedStunt))
  const stuntDescription = stuntToDisplay ? stuntToDisplay.description : "" 

  return (
    <>
      <Form>
        <TextArea
          className="stunt-description"
          rows={8}
          value={stuntDescription}
        />
      </Form>
    </>
  )
}

export default StuntDescription;