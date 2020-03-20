import React from "react";

const AspectInput = props => {
  const index = props.index;
  const aspectToEdit = props.aspects[index];
  const aspectName = aspectToEdit ? aspectToEdit.name : ""
  const aspectTypes = props.aspectTypes;
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


/*
      <input 
          type="text"
          required
          onChange={handleFieldChange}
          className="aspect"
          id="aspect-0"
          placeholder="High Concept"
          value={aspects[0].name}
        />
        <input 
          type="text"
          required
          onChange={handleFieldChange}
          className="aspect"
          id="aspect-1"
          placeholder="Trouble"
          value={aspects[1].name}
        />
        <input 
          type="text"
          required
          onChange={handleFieldChange}
          className="aspect"
          id="aspect-2"
          placeholder="Aspect"
          value={aspects[2].name}
        />
        <input 
          type="text"
          required
          onChange={handleFieldChange}
          className="aspect"
          id="aspect-3"
          placeholder="Aspect"
          value={aspects[3].name}
        />
        <input 
          type="text"
          required
          onChange={handleFieldChange}
          className="aspect"
          id="aspect-4"
          placeholder="Aspect"
          value={aspects[4].name}
        />
    */