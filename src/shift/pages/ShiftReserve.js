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

const ShiftReserve = () => {

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
      specialty: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();
  const token = useSelector((state) => state.user.token);

  const shiftSubmitHandler = async event => {
    event.preventDefault();

    try {
      const requestBody = {
        name: formState.inputs.name.value
      };

      await sendRequest('http://localhost:5000/api/shift/reservation', 
        'PUT',
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
      <form className="shift-form" onSubmit={shiftSubmitHandler} 
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}} 
        method='PUT'>
          {isLoading && <LoadingSpinner asOverlay />}
          <Card style={{ width: '80%', maxWidth: '600px', padding: '20px', textAlign: 'center'}}>
            <h1> YOUR SHIFT RESERVATION:</h1>
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
            <Input
              id="surname"
              element="input"
              type="text"
              label="Surname"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
            <Input
              id="specialty"
              element="input"
              type="text"
              label="Specialty"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          </Card>
          <Button type="submit" disabled={!formState.isValid}>
            RESERVE 
          </Button>
      </form>
    </React.Fragment>
  );
};

export default ShiftReserve;