// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// import MainHeader from './MainHeader';
// import NavLinks from './NavLinks';
// import SideDrawer from './SideDrawer';
// import './MainNavigation.css';

// const MainNavigation = props => {
//   const [drawerIsOpen, setDrawerIsOpen] = useState(false);

//   const openDrawerHandler = () => {
//     setDrawerIsOpen(true);
//   };

//   const closeDrawerHandler = () => {
//     setDrawerIsOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
//         <nav className="main-navigation__drawer-nav">
//           <NavLinks />
//         </nav>
//       </SideDrawer>

//       <MainHeader>
//         <button
//           className="main-navigation__menu-btn"
//           onClick={openDrawerHandler}
//         >
//           <span />
//           <span />
//           <span />
//         </button>
//         <h1 className="main-navigation__title">
//           <Link to="/">SHIFT SYSTEM</Link>
//         </h1>
//         <nav className="main-navigation__header-nav">
//           <NavLinks />
//         </nav>
//       </MainHeader>
//     </React.Fragment>
//   );
// };

// export default MainNavigation;

import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Link as MuiLink } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <NavLinks />
      </SideDrawer>

      <MainHeader>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={openDrawerHandler}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <MuiLink color="inherit" underline="none" component={RouterLink} to="/">SHIFT SYSTEM</MuiLink>
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;