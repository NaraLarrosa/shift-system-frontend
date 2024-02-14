import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useHttpClient } from '../../shared/hooks/http-hook';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
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
        `http://localhost:5000/api/user/reset-password/${token}`,
        'PATCH',
        JSON.stringify({ password }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push('/login');
    } catch (err) {
      setError(err.message || 'Something went wrong, please try again.');
    }

    setIsLoading(false);
};

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay />}
            <h2>Reset Password</h2>
            <hr />
            <form onSubmit={submitHandler}>
            <Input
                element="input"
                id="password"
                type="password"
                label="New Password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid password, at least 6 characters."
                onInput={setPassword}
            />
            <Button type="submit" disabled={!password}>
                RESET PASSWORD
            </Button>
            </form>
        </Card>
        </React.Fragment>
    );
};

export default ResetPassword;