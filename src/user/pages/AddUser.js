import React from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './UsersForm.css';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';

const AddUser = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      surname: {
        value: '',
        isValid: false
      },
      dni: {
        value: '',
          isValid: false
      },
      type: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },false
  );

  const history = useHistory();

  const userSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest('http://localhost:5000/api/user/add', 'POST', JSON.stringify({
        name: formState.inputs.name.value,
        surname: formState.inputs.surname.value,
        dni: formState.inputs.dni.value,
        type: formState.inputs.type.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value
      }), {
        'Content-Type': 'application/json'
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="user-form" onSubmit={userSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          id="surname"
          element="textarea"
          label="Surname"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid surname."
          onInput={inputHandler}
        />
        <Input
          id="dni"
          element="input"
          label="DNI"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid dni."
          onInput={inputHandler}
        />
        <Input
          id="type"
          element="input"
          type="text"
          label="type"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid type."
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          type="text"
          label="Email"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="text"
          label="Password"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid password."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD USER
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddUser;