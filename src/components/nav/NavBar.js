import React, {useState } from "react";
import { withRouter } from "react-router-dom";
import { Menu, Segment } from 'semantic-ui-react'
import "../../App.css";
import { useAuth } from "../../hooks/useAuth";
import "./NavBar.css"

const NavBar = (props) => {
  const { user, signin, signout } = useAuth();
  const [activeItem, setActiveItem] = useState('home')

  const NAV_ITEMS = ['characters', 'types', 'skills', 'stunts']

  const handleLogout = () => {
    signout();
    props.history.push('/');
  }

  const handleItemClick = (e, { name, to }) => {
    setActiveItem(name)
    props.history.push(to)
  }

  return (
    <Segment basic>
      <div className="header-container">
        <h1 className="title">Fate Character Codex</h1>
      </div>
      <div className="navbar-container">
        <Menu inverted size="huge" color="blue">
          {NAV_ITEMS.map((name) => 
            <Menu.Item
              name={name}
              link={true}
              to={`/${name}`}
              active={activeItem === name}
              onClick={handleItemClick}
            />
          )}
          {user 
            ? <Menu.Item
                name='logout'
                to={"/logout"}
                link={true}
                active={activeItem === 'logout'}
                onClick={handleLogout}
              /> 
            : <Menu.Item
                name='login'
                // to={"/login"}
                // link={true}
                // active={activeItem === 'login'}
                // onClick={handleItemClick}
                onClick={signin}
              /> 
          }
        </Menu>
      </div>
    </Segment>
  )
}

export default withRouter(NavBar);