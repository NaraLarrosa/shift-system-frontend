import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './ShiftForm.css';

const NewShift = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      day: {
        value: '',
        isValid: true
      },
      hour: {
        value: '',
        isValid: false
      },
      description: {
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
      },
      canceled: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const shiftSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('day', formState.inputs.day.value);
      formData.append('hour', formState.inputs.hour.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('available', formState.inputs.available.value);
      formData.append('doctor', formState.inputs.doctor.value);
      formData.append('canceled', formState.inputs.canceled.value);
      await sendRequest('http://localhost:5000/api/shift/create', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="shift-form" onSubmit={shiftSubmitHandler}>
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
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
        />
        <Input
          id="available"
          element="input"
          label="Available"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter true or false."
          onInput={inputHandler}
        />
        <Input
          id="doctor"
          element="input"
          label="Doctor"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid doctor."
          onInput={inputHandler}
        />
        <Input
          id="canceled"
          element="input"
          label="Canceled"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter true or false."
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
