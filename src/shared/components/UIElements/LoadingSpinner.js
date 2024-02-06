// import React from 'react';

// import './LoadingSpinner.css';

// const LoadingSpinner = props => {
//   return (
//     <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
//       <div className="lds-dual-ring"></div>
//     </div>
//   );
// };

// export default LoadingSpinner;

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      position="fixed"
      top={0}
      left={0}
      bgcolor="rgba(255, 255, 255, 0.7)"
      zIndex={9999}
      className={props.asOverlay ? 'loading-spinner__overlay' : ''}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default LoadingSpinner;