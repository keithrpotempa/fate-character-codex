import React from "react";
import { Divider, List } from "semantic-ui-react";


const CharacterAspects = props => {
  const aspects = props.aspects

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