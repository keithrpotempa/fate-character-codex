import React, { useEffect, useState } from "react";
import ApiManager from "../../../modules/ApiManager";
import { Divider, List } from "semantic-ui-react";


const CharacterAspects = props => {
  const [aspects, setAspects] = useState([]);
  const id = props.id;

  const getAspects = () => {
    ApiManager.getCharacterAspects(id)
      .then(setAspects);
  }

  useEffect(()=>{
    getAspects();
  }, [])

  return (
    <>
      <Divider horizontal>
        <h4>Aspects</h4>
      </Divider>
      <List celled>
        {aspects.map(aspect =>
          <List.Item 
            key={`aspect-${aspect.id}`}
            content={aspect.name}
            // meta={aspect.aspectTypeId}
          />
        )}
      </List>
    </>
  )
}

export default CharacterAspects;