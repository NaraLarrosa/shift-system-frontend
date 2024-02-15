import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import axios from 'axios';

function RecoverPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    const handleRecoverPassword = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/user/recover-password', 
                { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/user/reset-password/${token}`,
                { newPassword }
            );
            setMessage(response.data.message); 
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h2" align="center">PASSWORD RECOVERY</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleRecoverPassword}>Send recovery email!</Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth type="password" label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth type="text" label="Recovery Token" value={token} onChange={(e) => setToken(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleResetPassword}>Reset Password</Button>
                </Grid>
            </Grid>
            <Typography variant="body1" align="center">{message}</Typography>
        </Container>
    );
}

export default RecoverPassword;