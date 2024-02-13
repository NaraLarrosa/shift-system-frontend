import React, { useEffect, useState } from 'react';
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
import { useSelector } from "react-redux";

import './DoctorForm.css';

const UpdateDoctor = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDoctor, setLoadedDoctor] = useState({});
  
  const doctorId = useParams().did;
  const history = useHistory();
  const token = useSelector((state) => state.user.token);

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
      },
      specialty: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const headers = {
          "Authorization": "Bearer " + token
        }
        const responseData = await sendRequest(
          `http://localhost:5000/api/doctor/${doctorId}`, "GET", null, headers
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
            },
            specialty: {
              value: '',
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchDoctor();
  }, [doctorId, sendRequest, setFormData, token]);

  const doctorUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/doctor/update/${doctorId}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
          surname: formState.inputs.surname.value,
          dni: formState.inputs.dni.value,
          specialty: formState.inputs.specialty
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      );
      history.push('/doctors');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  };

  if (Object.keys(loadedDoctor).length === 0 && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find a doctor!</h2>
        </Card>
      </div>
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedDoctor && (
        <div className="centered-container">
          <h2>
            <strong>MODIFY DOCTOR DATA:</strong>
          </h2>
          <form className="doctor-form">
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name."
              onInput={inputHandler}
              initialvalue={loadedDoctor.name}
              initialvalid={true.toString()}
            />
            <Input
              id="surname"
              element="input"
              type="text"
              label="Surname"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid surname (min. 5 characters)."
              onInput={inputHandler}
              initialvalue={loadedDoctor.surname}
              initialvalid={true.toString()}
            />
            <Input
              id="dni"
              element="input"
              type="number"
              label="DNI"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid DNI (min. 5 characters)."
              onInput={inputHandler}
              initialvalue={loadedDoctor.dni}
              initialvalid={true.toString()}
            />
            <Input
              id="specialty"
              element="input"
              type="string"
              label="Specialty ID"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid Specialty (ID)."
              onInput={inputHandler}
              initialvalue={loadedDoctor.specialty}
              initialvalid={true.toString()}
            />
            <Button disabled={!formState.isValid} onClick={doctorUpdateSubmitHandler} method='PATCH'>
              UPDATE DOCTOR
            </Button>
          </form>
        </div>
      )}
    </React.Fragment>
  );
};

export default UpdateDoctor;
