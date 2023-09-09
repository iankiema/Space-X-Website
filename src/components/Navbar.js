import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../logo/space-logo.png';
import '../App.css';

const Navbar = () => (
  <header>
    <div className="container-title">
      <div className="container-logo">
        <img className="logo" src={Logo} alt="spaceX-logo" />
        <h1 className="store">Space Travelers Hub</h1>
      </div>
      <ul>
        <li>
          <NavLink to="/rockets" className="current">Rockets</NavLink>
        </li>
        <li>
          <NavLink to="/missions" className="current">Missions</NavLink>
        </li>
        <li>
          <NavLink to="/" className="current last">My Profile</NavLink>
        </li>
      </ul>
    </div>
  </header>
);

export default Navbar;
