// import React from 'react';
// import ReactDOM from 'react-dom';
// import { CSSTransition } from 'react-transition-group';

// import './SideDrawer.css';

// const SideDrawer = props => {
//   const content = (
//     <CSSTransition
//       in={props.show}
//       timeout={200}
//       classNames="slide-in-left"
//       mountOnEnter
//       unmountOnExit
//     >
//       <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
//     </CSSTransition>
//   );

//   return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
// };

// export default SideDrawer;


import React from 'react';
import ReactDOM from 'react-dom';
import { Slide } from '@mui/material';

import './SideDrawer.css';

const SideDrawer = props => {
  const content = (
    <Slide
      direction="left"
      in={props.show}
      timeout={200}
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </Slide>
  );

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
