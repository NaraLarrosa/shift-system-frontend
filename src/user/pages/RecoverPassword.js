import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useForm } from '../../shared/hooks/form-hook';

import { useHttpClient } from '../../shared/hooks/http-hook';
import './UserForm.css';
import {
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';

const RecoverPassword = () => {
 
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  const uid = useParams().uid;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      color: {
        value: '',
        isValid: false
      },
      price: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user/${uid}`
        );
        setLoadedUser(responseData.user);
        setFormData(
          {
            email: {
              value: responseData.user.email,
              isValid: true
            },
            password: {
              value: responseData.user.password,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest, uid, setFormData]);

  const userUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/product/${uid}`,
        'PATCH',
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedUser && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find user!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUser && (
        <form className="user-form" onSubmit={userUpdateSubmitHandler}>
          <Input
            id="email"
            element="input"
            type="text"
            label="Email"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
            initialValue={loadedUser.email}
            initialValid={true}
          />
          <Input
            id="password"
            element="textarea"
            label="Password"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid password"
            onInput={inputHandler}
            initialValue={loadedUser.password}
            initialValid={true}
          />
          <Button type="submit" >
            RECOVER PASSWORD
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default RecoverPassword;
