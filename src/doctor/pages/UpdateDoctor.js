import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './DoctorForm.css';

const UpdateDoctor = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDoctor, setLoadedDoctor] = useState();
  const doctorId = useParams().doctorId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
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
      }
    },
    false
  );

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/doctor/update/${doctorId}`
        );
        setLoadedDoctor(responseData.doctor);
        setFormData(
          {
            name: {
              value: responseData.doctor.name,
              isValid: true
            },
            surname: {
              value: responseData.doctor.surname,
              isValid: true
            },
            dni: {
              value: responseData.doctor.dni,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchDoctor();
  }, [sendRequest, doctorId, setFormData]);

  const doctorUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/doctor/${doctorId}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
          surname: formState.inputs.surname.value,
          dni: formState.inputs.dni.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/' + auth.userId + '/doctors');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedDoctor && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find a doctor!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedDoctor && (
        <form className="doctor-form" onSubmit={doctorUpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
            initialValue={loadedDoctor.name}
            initialValid={true}
          />
          <Input
            id="surname"
            element="textarea"
            label="Surname"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid surname (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedDoctor.surname}
            initialValid={true}
          />
          <Input
            id="dni"
            element="number"
            label="DNI"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid DNI (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedDoctor.dni}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE DOCTOR
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateDoctor;
