import React, { useEffect } from "react";
import { Card } from "semantic-ui-react"
import StuntCard from "./StuntCard"

const StuntList = props => {
  const stunts = props.stunts;
  useEffect(() => {
  }, [])

  return (
    <>
        <Card.Group itemsPerRow={2}>
          {stunts.map(stunt => 
            <StuntCard
              key={stunt.id}
              stunt={stunt}
            />  
          )}
        </Card.Group>
    </>
  )
}

export default StuntList