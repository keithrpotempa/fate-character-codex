import React from "react";
import { Checkbox, Icon, List, Popup } from "semantic-ui-react";

const StressBoxes = props => {
  const type = props.type;
  const stressType = props.stressType;
  const bothStressTypes = props.bothStressTypes;
  const rating = props.skillRating;
  const stressMax = props.stressMax;

  const makeJSXBoxes = (numberOfBoxes) => {
    let checkboxes = [];
    for (let i = 1; i <= numberOfBoxes; i++) {
      checkboxes.push(
        <List.Item>
          <strong>{i}</strong><Checkbox/>
        </List.Item>
      )
    }
    return checkboxes;
  }

  const renderBoxes = () => {
    /* 
      If relevant skill rating is:
        0: they get 1, 2 boxes
        1-2: they get 1, 2, 3, boxes
        3+: they get 1, 2, 3, 4 boxes

      Also, make sure the amount of stress boxes 
      doesn't exceed the character type's stressMax value
    */
    switch(rating) {
      default:
      case 0:
        return makeJSXBoxes(2 <= stressMax ? 2 : stressMax)
      case 1:
      case 2:
        return makeJSXBoxes(3 <= stressMax ? 3 : stressMax)
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return makeJSXBoxes(4 <= stressMax ? 4 : stressMax)
    }
  }
  
  return (
    <>
      <h4> 
        {stressType.toUpperCase()} STRESS 
        {/* A popup explains the logic behind a character's stress tracks */}
        <Popup
          basic
          trigger={<Icon className="info circle large"/>} 
          content={
            <>
              <p>
                {type} can have up to {stressMax} stress in a single track.
              </p>
              <p>
                {bothStressTypes === true
                  ? "They have both physical and mental stress tracks"
                  : "They have only one generic stress track"
                }
              </p>
            </>
          }
          className="info circle large"
          />
      </h4>
      <List horizontal>
        {renderBoxes()}
      </List>
    </>
  )

}

export default StressBoxes; 