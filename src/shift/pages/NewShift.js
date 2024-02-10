import React from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useSelector } from "react-redux";

const NewShift = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      day: {
        value: '',
        isValid: false
      },
      hour: {
        value: '',
        isValid: false
      },
      available: {
        value: '',
        isValid: false
      },
      doctor: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const token = useSelector((state) => state.user.token);
  const history = useHistory();

  const shiftSubmitHandler = async event => {
    event.preventDefault();
    try {

      const requestBody = {
        day: formState.inputs.name.value,
        hour: formState.inputs.surname.value,
        doctor: formState.inputs.doctor.value,
        specialty: formState.inputs.specialty.value
      };

      await sendRequest('http://localhost:5000/api/shift/create',
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
      <form className="shift-form" onSubmit={shiftSubmitHandler} method='POST'>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="day"
          element="input"
          type="text"
          label="Day"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid day."
          onInput={inputHandler}
        />
        <Input
          id="hour"
          element="number"
          label="Hour"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid hour."
          onInput={inputHandler}
        />
        <Input
          id="doctor"
          element="input"
          label="Doctor"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          id="specialty"
          element="input"
          label="Specialty"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD SHIFT
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewShift;
