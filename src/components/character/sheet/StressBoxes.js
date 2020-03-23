import React from "react";
import { Checkbox, List } from "semantic-ui-react";

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
    <h4> {stressType.toUpperCase()} STRESS </h4>
     {rating <= 0 
      ? <List horizontal>
          <List.Item>{checkBox(1)}</List.Item>
          <List.Item>{checkBox(2)}</List.Item>
        </List>
      : <></>
     } 
     {rating === 1 || rating === 2 
      ? <List horizontal>
          <List.Item>{checkBox(1)}</List.Item>
          <List.Item>{checkBox(2)}</List.Item>
          <List.Item>{checkBox(3)}</List.Item>
        </List>
      : <></>
     }
     {rating >= 3
      ? <List horizontal>
          <List.Item>{checkBox(1)}</List.Item>
          <List.Item>{checkBox(2)}</List.Item>
          <List.Item>{checkBox(3)}</List.Item>
          <List.Item>{checkBox(4)}</List.Item>
        </List>
      : <></>
     }
    </>
  )

}

export default StressBoxes; 