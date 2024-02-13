import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button as MuiButton } from '@mui/material';

const Button = (props) => {
  const { href, to, size, inverse, danger, type, onClick, disabled, children, ...other } = props;

  if (href) {
    return (
      <a
        className={`button button--${size || 'default'} ${inverse && 'button--inverse'} ${danger && 'button--danger'}`}
        href={href}
        {...other}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <RouterLink
        to={to}
        className={`button button--${size || 'default'} ${inverse && 'button--inverse'} ${danger && 'button--danger'}`}
        {...other}
      >
        {children}
      </RouterLink>
    );
  }

  return (
    <MuiButton
      className={`button button--${size || 'default'} ${inverse && 'button--inverse'} ${danger && 'button--danger'}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...other}
    >
      {children}
    </MuiButton>
  );
};

export default Button;