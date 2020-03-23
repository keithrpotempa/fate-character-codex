import React, { useEffect, useState } from "react";
import ApiManager from "../../../modules/ApiManager";
import { Card, Divider, List } from "semantic-ui-react";


const CharacterStunts = props => {
  const [stunts, setStunts] = useState([]);
  const id = props.id;

  const getStunts = () => {
    ApiManager.getCharacterStunts(id)
      .then(setStunts);
  }

  useEffect(()=>{
    getStunts();
  }, [])

  return (
    <>
      <Divider horizontal>
        <h4>Stunts</h4>
      </Divider>
      <Card.Group basic>
        {stunts.map(stunt => 
          <Card key={`stunt-${stunt.stunt.id}`}
          header={stunt.stunt.name}
          description={stunt.stunt.description}
          />
        )}
      </Card.Group>
    </>
  )
}

export default CharacterStunts;