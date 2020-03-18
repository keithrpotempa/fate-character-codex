import React from "react";

const AspectForm = props => {
  const aspects = props.aspects

  const handleFieldChange = evt => {
      const stateToChange = [...aspects]
      // Determining which aspect is being edited: #1-5
      stateToChange[evt.target.id.split("-")[1]].name = evt.target.value;
      props.setAspects(stateToChange)
  }

  // TODO: Refactor these functions (and their uses below) 
  // to be less hackey/weird
  const findOneAspectByType = (aspects, typeId) => {
    const aspect = aspects.find( ({aspectTypeId}) => aspectTypeId === typeId )
    if (aspect !== undefined) {
      return aspect.name
    } else {
      return ""
    }
  }

  const findManyAspectsByType = (aspects, typeId) => {
    const aspectList = aspects.filter( ({aspectTypeId}) => aspectTypeId === typeId)
    if (aspectList.length > 0) {
      return aspectList
    } else {
      return ""
    }
  }

  const genericAspectOrBlank = (index) => {
    const aspect = findManyAspectsByType(aspects, 3)[index]
    if (aspect !== undefined) {
      return aspect.name
    } else {
      return ""
    }
  }

  return (
    <>
      <div className="aspects-container">
        <h3>Aspects</h3>
        <input 
          type="text"
          required
          onChange={handleFieldChange}
          className="aspect"
          id="aspect-0"
          placeholder="High Concept"
          value={findOneAspectByType(aspects, 1)}
        />
        <input 
          type="text"
          required
          onChange={handleFieldChange}
          className="aspect"
          id="aspect-1"
          placeholder="Trouble"
          value={findOneAspectByType(aspects, 2)}
        />
        <input 
          type="text"
          required
          onChange={handleFieldChange}
          className="aspect"
          id="aspect-2"
          placeholder="Aspect"
          value={genericAspectOrBlank(0)}
        />
        <input 
          type="text"
          required
          onChange={handleFieldChange}
          className="aspect"
          id="aspect-3"
          placeholder="Aspect"
          value={genericAspectOrBlank(1)}
        />
        <input 
          type="text"
          required
          onChange={handleFieldChange}
          className="aspect"
          id="aspect-4"
          placeholder="Aspect"
          value={genericAspectOrBlank(2)}
        />
      </div>
    </>
  )
}

export default AspectForm;