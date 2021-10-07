import React from "react";
import { Item, Divider } from "semantic-ui-react";

const CharacterStunts = ({ stunts, stuntList }) => {
  return (
    stunts.length > 0 && stuntList.length > 0
    ? <>
        <Divider horizontal>
          <h4>Stunts</h4>
        </Divider>
        <Item.Group>
          {/* 
            NOTE, this was stunt.stunt.id, stunt.stunt.name, stunt.stunt.description
            before the firebase migration of character sheet.

            This may cause problems with preview...
          */}
          {stunts.map(stuntId => {
            const stunt = stuntList.find((s) => s.id === stuntId);
            return (
              <Item key={`stunt-${stunt.id}`}
                header={stunt.name}
                description={stunt.description}
              />
            )
          })}
        </Item.Group>
      </>
    : <></>
  )
}

export default CharacterStunts;