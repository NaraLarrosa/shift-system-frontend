import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL
} from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';

const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { sendRequest, clearError } = useHttpClient();
    const history = useHistory();

    const submitHandler = async event => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

    try {
        const responseData = await sendRequest(
            'http://localhost:5000/api/user/recover-password',
            'POST',
        JSON.stringify({ email }),
        {
            'Content-Type': 'application/json'
        }
        );

      history.push('/'); 
    } catch (err) {
      setError(err.message || 'Something went wrong, please try again.');
    };

    setIsLoading(false);
};

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay />}
            <h2>Recover Password</h2>
            <hr />
            <form onSubmit={submitHandler}>
            <Input
                element="input"
                id="email"
                type="email"
                label="E-Mail"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onInput={setEmail}
            />
            <Button type="submit" disabled={!email}>
                RECOVER PASSWORD
            </Button>
            </form>
        </Card>
        </React.Fragment>
    );
};

export default RecoverPassword;