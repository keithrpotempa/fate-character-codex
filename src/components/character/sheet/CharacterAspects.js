import React from "react";
import { Divider, List } from "semantic-ui-react";


const CharacterAspects = ({aspects}) => {
  return (
    <>
      <Divider horizontal>
        <h4>Aspects</h4>
      </Divider>
      <List celled>
        {aspects.map(aspect =>
          aspect.name !== ""
          ? <List.Item 
              key={`aspect-${aspect.id}`}
              content={aspect.name}
              // meta={aspect.aspectTypeId}
            />
          : null
        )}
      </List>
    </>
  )
}

export default CharacterAspects;