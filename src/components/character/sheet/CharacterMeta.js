import  React, { useState, useEffect } from "react";
import { Container, Item } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager";

const CharacterMeta = ({ userId, character }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = () => {
      if (userId) {
        ApiManager.get("users", userId)
          .then(setUser)
      }
    }
    
    getUser();
  }, [userId])

  return (
    character
    ? <>
        <Container textAlign="right">
          <Item>
            <Item.Meta className="metadata">
              {/* FIXME */}
              {/* <p>Created by: {user.email}</p> */}
              <p>Date Created: {character.created}</p>
              <p>Last Modified: {character.modified}</p>
            </Item.Meta>
          </Item>
        </Container>
      </>
    : <></>
  )
}

export default CharacterMeta;