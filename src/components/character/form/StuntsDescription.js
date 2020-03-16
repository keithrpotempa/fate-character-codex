import React from "react";

const StuntDescription = props => {
  const stuntList = props.stuntList;
  const characterStunts = props.characterStunts;
  const match = characterStunts.find( obj => obj.row === parseInt(props.x) )

  if (match !== undefined) {
    const stunt = stuntList.find(stunt => stunt.id === match.stuntId)
    return (
      <>
        <div className="stunt-description">{stunt.description}</div>
      </>
    )
  } else {
    return (
      <>
        <div className="stunt-description"></div>
      </>
    )
  }
}

export default StuntDescription;