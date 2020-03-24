import React, { useEffect, useState } from "react";
import ApiManager from "../../../modules/ApiManager";
import { Item, Divider } from "semantic-ui-react";


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
    stunts.length > 0 
    ? <>
        <Divider horizontal>
          <h4>Stunts</h4>
        </Divider>
        <Item.Group>
          {stunts.map(stunt => 
            <Item key={`stunt-${stunt.stunt.id}`}
            header={stunt.stunt.name}
            description={stunt.stunt.description}
            />
          )}
        </Item.Group>
      </>
    : <></>
  )
}

export default CharacterStunts;