import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Switch, Link as MuiLink } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const MainNavigation = (props) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <NavLinks />
      </SideDrawer>

      <MainHeader>
        <Box sx={{ flexGrow: 1 }}>
          <FormGroup>
            <Switch
              checked={auth}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'authentication switch' }}
            />
          </FormGroup>
        <AppBar position="static">
          <Toolbar >
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
            {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu 
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem 
                  onClick={handleClose} 
                  component={RouterLink} 
                  to="/user-item"
                  >My account 
                </MenuItem>
              </Menu>
            </div>
          )}
          </Toolbar>
        </AppBar>
        </Box>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;