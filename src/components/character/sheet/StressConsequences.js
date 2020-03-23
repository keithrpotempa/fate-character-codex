import React from "react";
import "../Character.css"

const StressConsequences = props => {
  const physiqueRating = props.physiqueRating;
  const willRating = props.willRating;

  const makeStressBoxes = (stressType) => {
    // If stresstype rating is 1-2, they get 1, 2, 3 boxes
    // If 3-4, they get 1, 2, 3, 4 boxes
    // If 5+, they also get a mild consequence slot 
    let rating;
    if (stressType === "physical") {
      rating = physiqueRating;
    } else if (stressType === "mental") {
      rating = willRating;
    }

    const checkBox = (number) => {
      return (
        <>
          <strong>{number}</strong><input type="checkbox"/>
        </>
      )
    }

    // TODO: make this DRY-er
    if (rating <= 0) {
      return (
        <>
          {checkBox(1)}
          {checkBox(2)}
        </>
      ) 
    } else if (rating <= 2 ) {
      return (
        <>
          {checkBox(1)}
          {checkBox(2)}
          {checkBox(3)}
      </>
      ) 
    } else if (rating >= 3 ) {
      return (
        <>
          {checkBox(1)}
          {checkBox(2)}
          {checkBox(3)}
          {checkBox(4)}
      </>
      )
    }
  }

  const makeConsequenceInputs = () => {
    const input = (number, placeholder) => {
      return (
        <>
          <strong>{number}</strong> <input type="text" placeholder={placeholder}/>
        </>
        )
    }

    const extraInputs = (stressType) => {
      let rating;
      if (stressType === "physical") {
        rating = physiqueRating
      } else if (stressType === "mental") {
        rating = willRating
      } 
      if (rating >= 5) {
        return (
          <>
            {input(2, `Mild ${stressType}`)} 
          </>
        )
      }
    }

    return (
      <>
        {input(2, "Mild")} {extraInputs("physical")} {extraInputs("mental")}<br/>
        {input(4, "Moderate")} <br/>
        {input(6, "Severe")}
      </>
    )
  }

  return (
    <>
      <div className="flex-rows">
          <div className="stress-container">
            <p><strong>Physical Stress</strong></p>
            <div className="stress-boxes-container">
              {makeStressBoxes("physical")}
            </div>
          </div>
          <div className="stress-container">
            <p><strong>Mental Stress</strong></p>
            <div className="stress-boxes-container">
              {makeStressBoxes("mental")}
            </div>
          </div>
          <div className="stress-container">
            <p><strong>Consequences</strong></p>
            <div className="consequences-container">
              {makeConsequenceInputs()}
            </div>
          </div>
      </div>
    </>
  )
}

export default StressConsequences