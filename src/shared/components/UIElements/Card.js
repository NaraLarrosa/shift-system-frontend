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
