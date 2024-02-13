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
      <form className="specialty-form" onSubmit={specialtySubmitHandler} 
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '-50px' }} 
        method='POST'>
          {isLoading && <LoadingSpinner asOverlay />}
          <Card style={{ width: '80%', maxWidth: '600px', padding: '20px', textAlign: 'center'}}>
            <h1> ADD SPECIALTY:</h1>
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