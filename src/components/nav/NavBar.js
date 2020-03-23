import React, {useState } from "react";
import { withRouter } from "react-router-dom";
import { Menu, Segment } from 'semantic-ui-react'
import "./NavBar.css";

const NavBar = props => {
  const [activeItem, setActiveItem] = useState('home')

  const hasUser = props.hasUser;

  const handleLogout = () => {
    props.clearUser();
    props.history.push('/');
  }

  const handleItemClick = (e, { name, to }) => {
    setActiveItem(name)
    props.history.push(to)
  }

  const MenuItem = name => {
    return (
      <Menu.Item
      name={name}
      link={true}
      to={`/${name}`}
      active={activeItem === name}
      onClick={handleItemClick}
    />
    )
  }

  return (
    <Segment>
      <h1>Fate Character Codex</h1>
      <Menu inverted className="blue">
        {MenuItem("home")}
        {MenuItem("characters")}
        {MenuItem("skills")}
        {MenuItem("stunts")}
        {hasUser 
          ? <Menu.Item
              name='logout'
              to={"/logout"}
              link={true}
              active={activeItem === 'logout'}
              onClick={handleLogout}
            /> 
          : <Menu.Item
              name='login'
              to={"/login"}
              link={true}
              active={activeItem === 'login'}
              onClick={handleItemClick}
            /> 
        }
      </Menu>
    </Segment>
  )
}

/*
const NavBar = props => {


  return (
    <header>

      <nav>
        <ul className="container">
          <li>
            <NavLink 
              className="nav-link" 
              activeClassName="active" 
              exact to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              className="nav-link" 
              activeClassName="active" 
              exact to="/characters"
            >
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink 
              className="nav-link" 
              activeClassName="active" 
              exact to="/skills"
            >
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink 
              className="nav-link" 
              activeClassName="active" 
              exact to="/stunts"
            >
              Stunts
            </NavLink>
          </li>
          {hasUser 
            ? <li>
                <span className="nav-link" onClick={handleLogout}> Logout </span>
              </li>
            : <li>
                <NavLink 
                  className="nav-link" 
                  activeClassName="active" 
                  exact to="/login"
                >
                  Login
                </NavLink>
              </li>
          }
          
        </ul>
      </nav>
    </header>
  )
}
*/

export default withRouter(NavBar);