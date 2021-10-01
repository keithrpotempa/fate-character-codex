import React from "react";
import { Input } from "semantic-ui-react";

const AspectInput = ({
  index,
  aspectTypes,
  aspects,
  handleFieldChange,
  typeId,
}) => {

  const aspectToEdit = aspects[index];
  const aspectName = aspectToEdit ? aspectToEdit.name : ""
  const aspectType = aspectTypes.find( ({id}) => id === parseInt(typeId) )
  const aspectTypeName = aspectType ? aspectType.name : ""
  // TODO: make this way less hackey and hardcoded

  return (
    <>
      <Input 
        fluid
        type="text"
        key={`aspect-${index}`}
        required
        onChange={handleFieldChange}
        className="aspect"
        id={`aspect-${index}`}
        placeholder={aspectTypeName}
        value={aspectName}
      />
    </>
  )
}

export default AspectInput;