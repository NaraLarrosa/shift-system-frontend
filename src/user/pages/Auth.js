import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../userSlice";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const dispatch = useDispatch();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const token = useSelector((state) => state.user.token);
  const history = useHistory();

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          surname: undefined,
          dni: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
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
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/user/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        )
        auth.login(responseData.userId, responseData.token);
        auth.token = responseData.token;
        console.log(auth);
        history.push('/specialties');
        
        const payload = {  
          'token' : responseData.token,
          'userId' : responseData.userId
        };

        dispatch(updateUser(payload));

      } catch (err) {}
    } else {
      try {

        const requestBody = {
          name: formState.inputs.name.value,
          surname: formState.inputs.surname.value,
          dni: formState.inputs.dni.value,
          type: formState.inputs.type.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        };

        const responseData = await sendRequest(
          'http://localhost:5000/api/user/register',
          'POST',
          JSON.stringify(requestBody), 
        {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      );

        history.push('/login');

      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="surname"
              type="text"
              label="Surname"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid surname."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="dni"
              type="number"
              label="DNI"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid dni."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="type"
              type="text"
              label="Type: 'admin or patient'"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid type."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid} onClick={authSubmitHandler}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
