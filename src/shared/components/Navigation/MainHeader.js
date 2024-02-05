// import React from 'react';

// import './MainHeader.css';

// const MainHeader = props => {
//   return <header className="main-header">{props.children}</header>;
// };

// export default MainHeader;

import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

const MainHeader = (props) => {
  return (
    <AppBar position="static">
      <Toolbar className="main-header">{props.children}</Toolbar>
    </AppBar>
  );
};

export default MainHeader;
