// import React, { useReducer, useEffect } from 'react';

// import { validate } from '../../util/validators';
// import './Input.css';

// const inputReducer = (state, action) => {
//   switch (action.type) {
//     case 'CHANGE':
//       return {
//         ...state,
//         value: action.val,
//         isValid: validate(action.val, action.validators)
//       };
//     case 'TOUCH': {
//       return {
//         ...state,
//         isTouched: true
//       };
//     }
//     default:
//       return state;
//   }
// };

// const Input = props => {
//   const [inputState, dispatch] = useReducer(inputReducer, {
//     value: props.initialValue || '',
//     isTouched: false,
//     isValid: props.initialValid || false
//   });

//   const { id, onInput } = props;
//   const { value, isValid } = inputState;

//   useEffect(() => {
//     onInput(id, value, isValid);
//   }, [id, value, isValid, onInput]);

//   const changeHandler = event => {
//     dispatch({
//       type: 'CHANGE',
//       val: event.target.value,
//       validators: props.validators
//     });
//   };

//   const touchHandler = () => {
//     dispatch({
//       type: 'TOUCH'
//     });
//   };

//   const element =
//     props.element === 'input' ? (
//       <input
//         id={props.id}
//         type={props.type}
//         placeholder={props.place}
//         onChange={changeHandler}
//         onBlur={touchHandler}
//         value={inputState.value}
//       />
//     ) : (
//       <textarea
//         id={props.id}
//         rows={props.rows || 3}
//         onChange={changeHandler}
//         onBlur={touchHandler}
//         value={inputState.value}
//       />
//     );

//   return (
//     <div
//       className={`form-control ${!inputState.isValid &&
//         inputState.isTouched &&
//         'form-control--invalid'}`}
//     >
//       <label htmlFor={props.id}>{props.label}</label>
//       {element}
//       {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
//     </div>
//   );
// };

// export default Input;

import React, { useEffect, useReducer } from 'react';
import { TextField } from '@mui/material';

import { validate } from '../../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput, validators, label, errorText, element, ...other } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const inputElement = element === 'input' ? (
    <TextField
      id={id}
      type={props.type}
      label={label}
      placeholder={props.place}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value}
      error={!inputState.isValid && inputState.isTouched}
      helperText={!inputState.isValid && inputState.isTouched && errorText}
      {...other}
    />
  ) : (
    <TextField
      id={id}
      multiline
      rows={props.rows || 3}
      label={label}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value}
      error={!inputState.isValid && inputState.isTouched}
      helperText={!inputState.isValid && inputState.isTouched && errorText}
      {...other}
    />
  );

  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
      {inputElement}
    </div>
  );
};

export default Input;
