import React, { useState, useEffect } from "react";
import { Divider, Form } from "semantic-ui-react";

const CharacterId = props => {
  const character = props.character;

  return (
    <>
      <Divider horizontal><h2>ID</h2></Divider>
      <Form.Field>
        <label htmlFor="characterName">Name</label>
        <Form.Input 
          type="text"
          required
          onChange={props.handleFieldChange}
          className="character"
          id="name"
          placeholder="Character name"
          value={character.name}
        />
      </Form.Field>
    </>
  )
}

export default CharacterId;