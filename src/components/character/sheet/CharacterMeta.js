import  React, { useState, useEffect } from "react";
import { Container, Item } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager";

const CharacterMeta = props => {
  const [user, setUser] = useState({})

  const getUser = () => {
    if (props.userId) {
      ApiManager.get("users", props.userId)
        .then(setUser)
    }
  }

  useEffect(() => {
    getUser();
  }, [props.userId])

  return (
    props.character
    ? <>
        <Container textAlign="right">
          <Item>
            <Item.Meta className="metadata">
              <p>Created by: {user.email}</p>
              <p>Date Created: {props.character.created}</p>
              <p>Last Modified: {props.character.modified}</p>
            </Item.Meta>
          </Item>
        </Container>
      </>
    : <></>
  )
}

export default CharacterMeta;