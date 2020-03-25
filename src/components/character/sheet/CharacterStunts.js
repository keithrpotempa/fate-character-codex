import React from "react";
import { Item, Divider } from "semantic-ui-react";

const CharacterStunts = props => {
  const stunts = props.stunts

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