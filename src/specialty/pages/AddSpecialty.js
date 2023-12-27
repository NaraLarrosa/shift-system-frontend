import React from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';

import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

const AddSpecialty = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
        name: {
            value: '',
            isValid: false
        }
    }, false
  );

  const history = useHistory();

  const specialtySubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', formState.inputs.title.value);
      await sendRequest('http://localhost:5000/api/specialty/add', 'POST', JSON.stringify({
        name: formState.inputs.title.value,
      }), {
        'Content-Type': 'application/json'
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="specialty-form" onSubmit={specialtySubmitHandler}>
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
        <Button type="submit" disabled={!formState.isValid}>
          ADD SPECIALTY
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddSpecialty;