import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import CharacterCodex from './components/CharacterCodex';

ReactDOM.render(
  <Router>
    <CharacterCodex/>
  </Router>, 
  document.getElementById('root')
);
