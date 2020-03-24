import React, { useState, useEffect } from "react";
import { Card, Container } from "semantic-ui-react"
import ApiManager from "../../modules/ApiManager";
import StuntCard from "./StuntCard"

const StuntList = props => {
  const [stunts, setStunts] = useState([]);

  const getStunts = () => {
    return ApiManager.getAllExpand("stunts", "skill")
      .then(setStunts);
  }

  useEffect(() => {
    getStunts();
  }, [])

  return (
    <>
      <Container text>
        <div className="header-container">
          <h1>Stunts</h1>
        </div>
        {/* Sorting the stunts alphabetically
          https://stackoverflow.com/a/45544166*/}
        <Card.Group itemsPerRow={2}>
          {stunts.sort((a,b) => a.name.localeCompare(b.name))
            .map(stunt => 
            <StuntCard
              key={stunt.id}
              stunt={stunt}
            />  
          )}
        </Card.Group>
      </Container>
    </>
  )
}

export default StuntList