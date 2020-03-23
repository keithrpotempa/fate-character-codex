import React from "react";
import { Checkbox } from "semantic-ui-react";

const StressBoxes = props => {
  const stressType = props.stressType;
  const rating = props.skillRating;

  // If stresstype rating is 1-2, they get 1, 2, 3 boxes
  // If 3-4, they get 1, 2, 3, 4 boxes
  
  const checkBox = (number) => {
    return (
      <>
        <strong>{number}</strong><Checkbox/>
      </>
    )
  }
  
  // TODO: make this DRY-er

  return (
    <>
    <h4> {stressType} </h4>
     {rating <= 0 
      ? <>
          {checkBox(1)}
          {checkBox(2)}
        </>
      : <></>
     } 
     {rating === 1 || rating === 2 
      ? <>
          {checkBox(1)}
          {checkBox(2)}
          {checkBox(3)}
        </>
      : <></>
     }
     {rating >= 3
      ? <>
          {checkBox(1)}
          {checkBox(2)}
          {checkBox(3)}
          {checkBox(4)}
        </>
      : <></>
     }
    </>
  )

}

export default StressBoxes; 