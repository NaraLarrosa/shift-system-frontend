import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/users" exact>
          USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/specialties" exact>
          SPECIALTIES
        </NavLink>
      </li>
      <li>
        <NavLink to="/doctors" exact>
          DOCTORS
        </NavLink>
      </li>
      <li>
        <NavLink to="/shifts" exact>
          SHIFTS
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
