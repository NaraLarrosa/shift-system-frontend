import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/register" exact>
          USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/" exact>
          SPECIALTIES
        </NavLink>
      </li>
      <li>
        <NavLink to="/" exact>
          DOCTORS
        </NavLink>
      </li>
      <li>
        <NavLink to="/history/cancel/:pid" exact>
          SHIFTS
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
