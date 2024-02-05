// import React from 'react';
// import { Link } from 'react-router-dom';

// import './Button.css';

// const Button = props => {
//   if (props.href) {
//     return (
//       <a
//         className={`button button--${props.size || 'default'} ${props.inverse &&
//           'button--inverse'} ${props.danger && 'button--danger'}`}
//         href={props.href}
//       >
//         {props.children}
//       </a>
//     );
//   }
//   if (props.to) {
//     return (
//       <Link
//         to={props.to}
//         exact={props.exact}
//         className={`button button--${props.size || 'default'} ${props.inverse &&
//           'button--inverse'} ${props.danger && 'button--danger'}`}
//       >
//         {props.children}
//       </Link>
//     );
//   }
//   return (
//     <button
//       className={`button button--${props.size || 'default'} ${props.inverse &&
//         'button--inverse'} ${props.danger && 'button--danger'}`}
//       type={props.type}
//       onClick={props.onClick}
//       disabled={props.disabled}
//     >
//       {props.children}
//     </button>
//   );
// };

// export default Button;


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