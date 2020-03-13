import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  return (
    <header>
      <h1 className="site-title">
        Fate Core Character Codex
        <br />
        <small>Make and find Fate Core PCs, NPCs, and creatures</small>
      </h1>
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
        </ul>
      </nav>
    </header>
  )
}

export default NavBar;