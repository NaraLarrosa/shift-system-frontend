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
import './DoctorForm.css';

const NewDoctor = () => {
  const auth = useContext(AuthContext);
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
      specialty: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const doctorSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', formState.inputs.title.value);
      formData.append('surname', formState.inputs.description.value);
      formData.append('dni', formState.inputs.address.value);
      formData.append('specialty', formState.inputs.image.value);
      await sendRequest('http://localhost:5000/api/doctor', 'POST', formData, {
      //await sendRequest(process.env.REACT_APP_BACKEND_URL + '/places', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      history.push('/doctors');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="doctor-form" onSubmit={doctorSubmitHandler}>
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
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid surname (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="dni"
          element="input"
          label="DNI"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid DNI."
          onInput={inputHandler}
        />
        <Input
          id="specialty"
          element="input"
          label="Specialty"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid specialty."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD DOCTOR
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewDoctor;
