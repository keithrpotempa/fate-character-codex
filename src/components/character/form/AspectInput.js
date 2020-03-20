import React from "react";

const AspectInput = props => {
  const index = props.index;
  const aspectTypes = props.aspectTypes;

  const aspectToEdit = props.aspects[index];
  const aspectName = aspectToEdit ? aspectToEdit.name : ""
  const aspectType = aspectTypes.find( ({id}) => id === parseInt(props.typeId) )
  const aspectTypeName = aspectType ? aspectType.name : ""
  // TODO: make this way less hackey and hardcoded

  return (
    <>
      <input 
        type="text"
        key={`aspect-${index}`}
        required
        onChange={props.handleFieldChange}
        className="aspect"
        id={`aspect-${index}`}
        placeholder={aspectTypeName}
        value={aspectName}
      />
    </>
  )
}

export default AspectInput;