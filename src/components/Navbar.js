import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../logo/space-logo.png';
import '../App.css';

const Navbar = () => {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState('');

  useEffect(() => {
    const currentRoute = location.pathname.split('/')[1];
    setActiveRoute(currentRoute);
  }, [location.pathname]);

  return (
    <header>
      <div className="container-title">
        <div className="container-logo">
          <img className="logo" src={Logo} alt="spaceX-logo" />
          <h1 className="store">Space Travelers Hub</h1>
        </div>
        <ul>
          <li>
            <NavLink to="/rockets" className={activeRoute === 'rockets' ? 'current' : ''}>Rockets</NavLink>
          </li>
          <li>
            <NavLink to="/missions" className={activeRoute === 'missions' ? 'current' : ''}>Missions</NavLink>
          </li>
          <li>
            <NavLink to="/" className={activeRoute === '' ? 'current last' : ''}>My Profile</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
