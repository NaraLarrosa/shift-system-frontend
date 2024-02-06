// import React from 'react';

// import './Card.css';

// const Card = props => {
//   return (
//     <div className={`card ${props.className}`} style={props.style}>
//       {props.children}
//     </div>
//   );
// };

// export default Card;

import React from 'react';
import Paper from '@mui/material/Paper';

const Card = (props) => {
  return (
    <Paper elevation={3} className={props.className} style={props.style}>
      {props.children}
    </Paper>
  );
};

export default Card;
