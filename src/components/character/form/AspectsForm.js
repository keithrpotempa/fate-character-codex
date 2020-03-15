import React from "react";

const AspectForm = props => {
  const aspects = props.aspects

  const handleFieldChange = evt => {
      const stateToChange = [...aspects]
      // Determining which aspect is being edited: #1-5
      stateToChange[evt.target.id.split("-")[1]].name = evt.target.value;
      props.setAspects(stateToChange)
  }

  return (
    <>
      <div className="aspects-container">
      <input 
        type="text"
        required
        onChange={handleFieldChange}
        className="aspect"
        id="aspect-0"
        placeholder="High Concept"
      />
      <input 
        type="text"
        required
        onChange={handleFieldChange}
        className="aspect"
        id="aspect-1"
        placeholder="Trouble"
      />
      <input 
        type="text"
        required
        onChange={handleFieldChange}
        className="aspect"
        id="aspect-2"
        placeholder="Aspect"
      />
      <input 
        type="text"
        required
        onChange={handleFieldChange}
        className="aspect"
        id="aspect-3"
        placeholder="Aspect"
      />
      <input 
        type="text"
        required
        onChange={handleFieldChange}
        className="aspect"
        id="aspect-4"
        placeholder="Aspect"
      />
      </div>
    </>
  )
}

export default AspectForm;