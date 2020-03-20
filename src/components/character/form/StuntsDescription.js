import React from "react";

const StuntDescription = props => {
  const stuntList = props.stuntList;
  const selectedStunt = props.stunt;
  const stuntToDisplay = stuntList.find(stunt => stunt.id === parseInt(selectedStunt))
  const stuntDescription = stuntToDisplay ? stuntToDisplay.description : "" 

  return (
    <>
      <div className="stunt-description">{stuntDescription}</div>
    </>
  )
}

export default StuntDescription;