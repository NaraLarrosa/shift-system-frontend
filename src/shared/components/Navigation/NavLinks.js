import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';

const NavLinks = () => {
  const NavList = styled('ul')({
    listStyle: 'inside',
    padding: 20,
    margin: 40,
    display: 'flex',
    flexDirection: 'column'
  });

  const NavItem = styled('li')({
    marginRight: '100px',
  });

  return (
    <NavList>
      <NavItem>
        <NavLink to="/users" exact>
          USERS
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/specialties" exact>
          SPECIALTIES
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/doctors" exact>
          DOCTORS
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/shift" exact>
          SHIFTS
        </NavLink>
      </NavItem>
    </NavList>
  );
};

export default NavLinks;
