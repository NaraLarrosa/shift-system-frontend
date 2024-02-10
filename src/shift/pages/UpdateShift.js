import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const UpdateShift = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedShift, setLoadedShift] = useState();
  const shiftId = useParams().shiftId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      day: {
        value: '',
        isValid: false
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

  useEffect(() => {
    const fetchShift = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/shift/update/${shiftId}`
        );
        setLoadedShift(responseData.shift);
        setFormData(
          {
            day: {
              value: responseData.shift.day,
              isValid: true
            },
            hour: {
              value: responseData.shift.hour,
              isValid: true
            },
            description: {
              value: responseData.shift.description,
              isValid: true
            },
            available: {
              value: responseData.shift.available,
              isValid: true
            },
            doctor: {
              value: responseData.shift.doctor,
              isValid: true
            },
            canceled: {
              value: responseData.shift.canceled,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchShift();
  }, [sendRequest, shiftId, setFormData]);

  const shiftUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/shift/update/${shiftId}`,
        'PATCH',
        JSON.stringify({
          day: formState.inputs.day.value,
          hour: formState.inputs.hour.value,
          description: formState.inputs.description.value,
          available: formState.inputs.available.value,
          doctor: formState.inputs.doctor.value,
          canceled: formState.inputs.canceled.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/' + auth.userId + '/shifts');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedShift && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find the shift!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedShift && (
        <form className="shift-form" onSubmit={shiftUpdateSubmitHandler}>
          <Input
            id="day"
            element="input"
            type="text"
            label="Day"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid day."
            onInput={inputHandler}
            initialValue={loadedShift.day}
            initialValid={true}
          />
          <Input
            id="hour"
            element="number"
            label="Hour"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid hour."
            onInput={inputHandler}
            initialValue={loadedShift.hour}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid description."
            onInput={inputHandler}
            initialValue={loadedShift.description}
            initialValid={true}
          />
          <Input
            id="available"
            element="boolen"
            label="Available"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter true or false."
            onInput={inputHandler}
            initialValue={loadedShift.available}
            initialValid={true}
          />
          <Input
            id="doctor"
            element="textarea"
            label="Doctor"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Doctor."
            onInput={inputHandler}
            initialValue={loadedShift.doctor}
            initialValid={true}
          />
          <Input
            id="canceled"
            element="boolean"
            label="Canceled"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter true or false."
            onInput={inputHandler}
            initialValue={loadedShift.canceled}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE SHIFT
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateShift;
