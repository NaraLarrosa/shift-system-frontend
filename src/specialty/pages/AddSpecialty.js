// import React from 'react';
// import { useHistory } from 'react-router-dom';

// import Input from '../../shared/components/FormElements/Input';
// import Button from '../../shared/components/FormElements/Button';
// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
// import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
// import { useForm } from '../../shared/hooks/form-hook';
// import { useHttpClient } from '../../shared/hooks/http-hook';
// import { useSelector, useDispatch } from "react-redux";
// import { updateSpecialties } from "../specialtySlice";

// import {
//   VALIDATOR_REQUIRE,
// } from '../../shared/util/validators';

// const AddSpecialty = () => {

//   const token = useSelector((state) => state.user.token);
//   const specialties = useSelector((state) => state.specialty.specialties);
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();
//   const [formState, inputHandler] = useForm(
//     {
//         name: {
//             value: '',
//             isValid: false
//         }
//     }, false
//   );
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const specialtySubmitHandler = async event => {
//     event.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('name', formState.inputs.name.value);
//       await sendRequest('http://localhost:5000/api/specialty/add', 'POST', {
//         Authorization: 'Bearer ' + token
//       });
//       dispatch(updateSpecialties(formData));
//       history.push('/');

//     } catch (err) {}
//   };

//   return (
//     <React.Fragment>
//       <ErrorModal error={error} onClear={clearError} />
//       <form className="specialty-form"  onSubmit={specialtySubmitHandler}>
//         {isLoading && <LoadingSpinner asOverlay />}
//         <Input
//           id="name"
//           element="input"
//           type="text"
//           label="Name"
//           validators={[VALIDATOR_REQUIRE()]}
//           errorText="Please enter a valid name."
//           onInput={inputHandler}
//         />
//         <Button type="submit" disabled={!formState.isValid}>
//           ADD SPECIALTY
//         </Button>
//       </form>
//     </React.Fragment>
//   );
// };

// export default AddSpecialty;

import React from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_REQUIRE} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector } from "react-redux";

const AddSpecialty = () => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();
  const token = useSelector((state) => state.user.token);

  const specialtySubmitHandler = async event => {
    event.preventDefault();

    try {
      // const formData = new FormData();
      // formData.append('name', formState.inputs.name.value);
      // const body = {
      //   "name": formState.inputs.name.value
      // }
      const requestBody = {
        name: formState.inputs.name.value
      };

      await sendRequest('http://localhost:5000/api/specialty/add', 
        'POST',
        JSON.stringify(requestBody), 
        {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      );

      history.push('/');

    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="specialty-form" onSubmit={specialtySubmitHandler} method='POST'>
        {isLoading && <LoadingSpinner asOverlay />}
        <Card>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
          />
        </Card>
        <Button type="submit" disabled={!formState.isValid}>
          ADD SPECIALTY
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddSpecialty;